import { SQLite } from 'expo-sqlite';
import moment from 'moment';
import AsyncStorageService from '../async-storage/async-storage.service';
import appConstants from '../../../appConstants';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import _ from 'lodash';
const config = { db: null };

let _this;
class SQLiteService {
    constructor() {
        _this = this;
    }
    async init() {
        AsyncStorageService.removeItem(appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY);
        /*try{
         await FileSystem.deleteAsync(
            `${FileSystem.documentDirectory}SQLite`
        );
        }catch(e){
            console.log(`[error][sqLite][service][removeItem]>>>`, e);

        }*/

        const folder = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
        if(!folder.exists) {
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`);
        
            await FileSystem.downloadAsync(
                Asset.fromModule(require('../../../../assets/moneyManager.db')).uri,
                `${FileSystem.documentDirectory}SQLite/moneyManager.db`
            );
        }
        config.db = SQLite.openDatabase("moneyManager.db");
    }

    async getAllCategories() {
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `SELECT 
                        categorySubcategory.id,
                        category.id AS categoryId, 
                        category.name AS categoryName,
                        subCategory.id AS subCategoryId, 
                        subCategory.value AS subCategoryValue,
                        imageIcon.name AS subCategoryIcon,
                        imageIcon.id AS subCategoryIconId
                    FROM categorySubcategory
                    INNER JOIN category on category.id = categorySubcategory.categoryId
                    INNER JOIN subCategory on subCategory.id = categorySubcategory.subCategoryId
                    INNER JOIN imageIcon on imageIcon.id = subCategory.imageIcon`,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];

                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            if(data[row.categoryId]){
                                data[row.categoryId].data.push({ id: row.subCategoryId, value: row.subCategoryValue, icon: { name: row.subCategoryIcon, id: row.subCategoryIconId } })
                            }else {
                                data[row.categoryId] = { 
                                    id: row.categoryId, 
                                    name: row.categoryName, 
                                    data: [{ id: row.subCategoryId, value: row.subCategoryValue, icon: {name: row.subCategoryIcon, id: row.subCategoryIconId} }],
                                    icon: {name: row.categoryName.split('.')[1]}
                                };

                            }
                        }
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getAllCategories]>>> ${err}`) });
        });
    }


    async getAllAccounts() {
        const uid = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_ID);
        const uCurrency = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_CURRENCY);
        const rates = await AsyncStorageService.getItem(appConstants.asyncStorageItem.RATES);

        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `SELECT 
                        account.id,
                        account.name,
                        account.uid,
                        account.value,
                        account.description,
                        account.firebaseId,
                        currency.id AS currencyId, 
                        currency.symbol AS currencySymbol, 
                        currency.name AS currencyName,
                        accountType.id AS accountTypeId, 
                        accountType.name AS accountTypeName, 
                        accountType.iconName AS accountTypeIconName
                    FROM account
                    INNER JOIN currency on currency.id = account.currencyId
                    INNER JOIN accountType on accountType.id = account.typeId
                    WHERE account.uid = '${uid}'`,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];
                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            const rateValue = row.currencyName != uCurrency.name ? (_.isNumber(row.value) ? row.value : 0.00) / rates[row.currencyName] : null;
                            data.push({ ...row, 
                                value: _.isNumber(row.value) ? row.value : "0.00", 
                                currency: { id: row.currencyId, 
                                    name: row.currencyName, 
                                    symbol: row.currencySymbol, 
                                    nameWithSymbol: row.currencyName + ` (${row.currencySymbol})`
                                }, 
                                type: {id: row.accountTypeId, name: row.accountTypeName, iconName: row.accountTypeIconName} ,
                                rateValue
                            });
                        }
                        _this.updateUserLastLogin(uid);
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getAllAccounts]>>> ${err}`) });
        });
    }

    async addAccount(account) {
        const { name, uid, value, currency, type, description, firebaseId } = account;
        const desc = description ? description : null;
        const firebase = firebaseId || null;

        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    'INSERT OR REPLACE INTO account (name, uid, value, currencyId, typeId, description, firebaseId) VALUES (?,?,?,?,?,?,?)',
                    [name, uid, value, currency.id, type.id, desc, firebase],
                    (tx, results) => {
                        resolve(results.insertId);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][addAccount]>>> ${err}`) });
        });
    }


    async updateAccount(account) {
        const { id, name, uid, value, currency, type, description, firebaseId } = account;
        const desc = description ? `"${description}"` : null;
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `UPDATE account SET name="${name}", value="${value}", currencyId="${currency.id}", typeId="${type.id}", description=${desc}, firebaseId="${firebaseId}"
                    WHERE id='${id}' AND uid='${uid}'`,
                    [],
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][updateAccount]>>> ${err}`) });
        });
    }

    async removeAccount(account) {
        const { id, firebaseId, uid } = account;
        let query = '';
        if (firebaseId) {
            query = `DELETE FROM account WHERE firebaseId='${firebaseId}' AND uid='${uid}'`;
        }else {
            query = `DELETE FROM account WHERE id='${id}' AND uid='${uid}'`
        }
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][removeAccount]>>> ${err}`) });
        });
    }

    async getAllFrom(table) {
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${table}`,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];

                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            data.push({ ...row });
                        }
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getAllFrom-${table}]>>> ${err}`) });
        });
    }

    async getAllCurrency() {
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `SELECT 
                        c.id,
                        c.name,
                        c.symbol, 
                        i.id AS iconId, 
                        i.name AS iconName 
                    FROM currency c
                    INNER JOIN imageIcon i ON i.id = c.icon`,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];

                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            data.push({ ...row, nameWithSymbol: row.name +` (${row.symbol})`, icon: {id: row.iconId, name: row.iconName} });
                        }
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getAllFromCurrency]>>> ${err}`) });
        });
    }

    async addTransaction(data) {
        const {id, account, categoryId, date, isExpense, oldValue, subCategory, uid, value, wasExpense, description, icon, firebaseId } = data;
        let query = null;
        
        const imageId = (icon && icon.id) ? `"${icon.id}"` : `"${subCategory.icon.id}"`;
        const desc = description ? `"${description}"` : null;
        const firebase = firebaseId ? `"${firebaseId}"` : null;

        if (id.toString().includes(appConstants.localId.transaction)) {
            query = `INSERT OR REPLACE INTO transactions (uid, accountId, date, categoryId, subCategoryId, value, oldValue, isExpense, wasExpense, imageIconId, description, firebaseId) 
            VALUES ("${uid}","${account}","${moment(date).format("YYYY-MM-DD")}","${categoryId}","${subCategory.id}","${value}","${oldValue}",
                    "${isExpense ? 1 : 0}","${wasExpense ? 1 : 0}",${imageId}, ${desc}, ${firebase}
            )`;
        } else {
            query = `INSERT OR REPLACE INTO transactions (id, uid, accountId, date, categoryId, subCategoryId, value, oldValue, isExpense, wasExpense, imageIconId, description, firebaseId) 
            VALUES ("${id}", "${uid}","${account}","${moment(date).format("YYYY-MM-DD")}","${categoryId}","${subCategory.id}","${value}","${oldValue}",
                    "${isExpense ? 1 : 0}","${wasExpense ? 1 : 0}",${imageId}, ${desc}, ${firebase}
            )`;
        }
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (tx, results) => {
                        resolve(results.insertId);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][addTransaction]>>> ${err}`) });
        });
    }


    async getTransactionsByDate(day) {
        const uid = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_ID);
        const uCurrency = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_CURRENCY);
        const rates = await AsyncStorageService.getItem(appConstants.asyncStorageItem.RATES);

        const query = `SELECT 
                        transactions.id AS id,
                        transactions.uid, 
                        date, 
                        categoryId, 
                        transactions.value, 
                        oldValue, 
                        isExpense, 
                        wasExpense,
                        transactions.firebaseId, 
                        transactions.description,
                        subCategory.id AS subCategoryId, 
                        subCategory.value AS subCategoryValue,
                        imageIcon.id AS imageIconId, 
                        imageIcon.name AS imageIconeName,
                        account.id AS account,
                        account.firebaseId AS accountFirebaseid,
                        account.name AS accountName,
                        account.value AS accountValue,
                        account.description AS accountDescription,
                        currency.name AS accountCurrency,
                        currency.id AS accountCurrencyId,
                        accountType.id AS accountTypeId,
                        accountType.name AS accountTypeName
                    FROM transactions
                    INNER JOIN account on account.firebaseId = transactions.accountId
                    INNER JOIN subCategory on subCategory.id = transactions.subCategoryId
                    INNER JOIN imageIcon on imageIcon.id = transactions.imageIconId
                    INNER JOIN currency on currency.id = account.currencyId
                    INNER JOIN accountType on accountType.id = account.typeId
                    WHERE transactions.uid = '${uid}' AND date = date('${moment(day).format("YYYY-MM-DD")}')`;

        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];
                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            const rateValue = row.accountCurrency != uCurrency.name ? (_.isNumber(row.value) ? row.value : 0.00) / rates[row.accountCurrency] : null;
                            data.push({
                                ...row,
                                value: _.isNumber(row.value) ? row.value : 0.00,
                                isExpense: row.isExpense === 1 ? true : false,
                                wasExpense: row.wasExpense === 1 ? true : false,
                                subCategory: { id: row.subCategoryId, value: row.subCategoryValue },
                                icon: { id: row.imageIconId, name: row.imageIconeName },
                                account: {
                                    id: row.account, firebaseId: row.accountFirebaseid, name: row.accountName, 
                                    value: _.isNumber(row.accountValue) ? row.accountValue : 0.00, 
                                    description: row.accountDescription, 
                                    currency: { id: row.accountCurrencyId, name: row.accountCurrency },
                                    type: { id: row.accountTypeId, name: row.accountTypeName }
                                },
                                rateValue
                            });
                        }
                        _this.updateUserLastLogin(uid);
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getTransactionsByDate]>>> ${err}`) });
        });
    }

    async getTransactionsByDateRange(dateStart, dateEnd) {
        const uid = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_ID);
        const uCurrency = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_CURRENCY);
        const rates = await AsyncStorageService.getItem(appConstants.asyncStorageItem.RATES);

        const query = `SELECT 
                        transactions.id AS id,
                        transactions.uid, 
                        date, 
                        categoryId, 
                        transactions.value, 
                        oldValue, 
                        isExpense, 
                        wasExpense, 
                        transactions.firebaseId,
                        transactions.description,
                        subCategory.id AS subCategoryId, 
                        subCategory.value AS subCategoryValue,
                        imageIcon.id AS imageIconId, 
                        imageIcon.name AS imageIconeName,
                        account.id AS account,
                        account.firebaseId AS accountFirebaseid,
                        account.name AS accountName,
                        account.value AS accountValue,
                        account.description AS accountDescription,
                        currency.name AS accountCurrency,
                        currency.id AS accountCurrencyId,
                        accountType.id AS accountTypeId,
                        accountType.name AS accountTypeName
                    FROM transactions
                    INNER JOIN account on account.firebaseId = transactions.accountId
                    INNER JOIN subCategory on subCategory.id = transactions.subCategoryId
                    INNER JOIN imageIcon on imageIcon.id = transactions.imageIconId
                    INNER JOIN currency on currency.id = account.currencyId
                    INNER JOIN accountType on accountType.id = account.typeId
                    WHERE transactions.uid = '${uid}' AND date >= date('${moment(dateStart).format("YYYY-MM-DD")}') AND date <= date('${moment(dateEnd).format("YYYY-MM-DD")}') `;

                    
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];
                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            const rateValue = row.accountCurrency != uCurrency.name ? (_.isNumber(row.value) ? row.value : 0.00) / rates[row.accountCurrency] : null;

                            data.push({
                                ...row,
                                value: _.isNumber(row.value) ? row.value : 0.00,
                                isExpense: row.isExpense === 1 ? true : false,
                                wasExpense: row.wasExpense === 1 ? true : false,
                                subCategory: { id: row.subCategoryId, value: row.subCategoryValue },
                                icon: { id: row.imageIconId, name: row.imageIconeName },
                                account: {
                                    id: row.account, firebaseId: row.accountFirebaseid, name: row.accountName,
                                    value: _.isNumber(row.accountValue) ? row.accountValue : 0.00,
                                    description: row.accountDescription,
                                    currency: { id: row.accountCurrencyId, name: row.accountCurrency },
                                    type: { id: row.accountTypeId, name: row.accountTypeName }
                                },
                                rateValue
                            });
                        }
                        _this.updateUserLastLogin(uid);
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getTransactionsByDateRange]>>> ${err}`) });
        });
    }

    async updateTransaction(transaction) {
        const { id, account, categoryId, date, isExpense, oldValue, subCategory, uid, value, wasExpense, description, icon, firebaseId } = transaction;
        const imageId = icon ? `"${icon.id}"` : `"${subCategory.icon.id}"`;
        const desc = description ? `"${description}"` : null;

        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `UPDATE transactions SET accountId="${account}", categoryId="${categoryId}", date="${moment(date).format("YYYY-MM-DD")}", isExpense="${isExpense ? 1 : 0}",
                    oldValue="${oldValue}",subCategoryId="${subCategory.id}",value="${value}",wasExpense="${wasExpense ? 1 : 0}",
                    description=${desc} , imageIconId=${imageId}, firebaseId="${firebaseId}"
                    WHERE id="${id}" AND uid="${uid}"`,
                    [],
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][updateTransaction]>>> ${err}`) });
        });
    }

    async removeTransaction(transaction) {
        const {id, firebaseId, uid} = transaction;
        let query = '';
        if (firebaseId) {
            query = `DELETE FROM transactions WHERE firebaseId='${firebaseId}' AND uid='${uid}'`;
        } else {
            query = `DELETE FROM transactions WHERE id="${id}" AND uid="${uid}"`
        }
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][removeTransaction]>>> ${err}`) });
        });
    }

    async addOrReplaceUser(user) {
        const { id, mail, language, currency, version, lastLogIn } = user;
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `INSERT OR REPLACE INTO user (id, mail, language, currency, version, lastLogIn) VALUES (?,?,?,?,?,?)`,
                    [id, mail, language, currency, version, lastLogIn],
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][addUser]>>> ${err}`) });
        });
    }

    async updateUserLastLogin(uid) {
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `UPDATE user SET lastLogIn="${moment().toString()}" WHERE id="${uid}"`,
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][updateUserLastLogin]>>> ${err}`) });
        });
    }

    async getUser(userId){
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM user WHERE id = "${userId}"`,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];
                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            data.push({ ...row });
                        }
                        resolve(data[0]);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getUser]>>> ${err}`) });
        });
    }
}

export default new SQLiteService();