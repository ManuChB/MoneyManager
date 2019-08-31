import { SQLite } from 'expo-sqlite';
import moment from 'moment';
import AsyncStorageService from '../async-storage/async-storage.service';
import appConstants from '../../../appConstants';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
const config = { db: null };

let _this;
class SQLiteService {
    constructor() {
        _this = this;
    }
    async init() {
        AsyncStorageService.removeItem(appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY);
       /* await FileSystem.deleteAsync(
             `${FileSystem.documentDirectory}SQLite`
        );
*/
        const folder = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
        if(!folder.exists) {
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`);
        }
        await FileSystem.downloadAsync(
            Asset.fromModule(require('../../../../assets/moneyManager.db')).uri,
            `${FileSystem.documentDirectory}SQLite/moneyManager.db`
        );
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
                        subCategory.value AS subCategoryValue
                    FROM categorySubcategory
                    INNER JOIN category on category.id = categorySubcategory.categoryId
                    INNER JOIN subCategory on subCategory.id = categorySubcategory.subCategoryId`,
                    [],
                    (tx, results) => {
                        const { rows } = results;
                        let data = [];

                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            if(data[row.categoryId]){
                                data[row.categoryId].data.push({ id: row.subCategoryId, value: row.subCategoryValue })
                            }else {
                                data[row.categoryId] = { 
                                    id: row.categoryId, 
                                    name: row.categoryName, 
                                    data: [{ id: row.subCategoryId, value: row.subCategoryValue }]
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
                            data.push({ ...row, 
                                currency:{id: row.currencyId, name: row.currencyName, symbol: row.currencySymbol}, 
                                type: {id: row.accountTypeId, name: row.accountTypeName, iconName: row.accountTypeIconName} 
                            });
                        }
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getAllAccounts]>>> ${err}`) });
        });
    }

    async addAccount(account) {
        const { name, uid, value, currency, type, description } = account;
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO account (name, uid, value, currencyId, typeId, description) VALUES (?,?,?,?,?,?)',
                    [name, uid, value, currency.id, type.id, description],
                    (tx, results) => {
                        resolve(results.insertId);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][addAccount]>>> ${err}`) });
        });
    }


    async updateAccount(account) {
        const { id, name, uid, value, currency, type, description, firebaseId } = account;
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `UPDATE account SET name="${name}", value="${value}", currencyId="${currency.id}", typeId="${type.id}", description="${description}", firebaseId="${firebaseId}"
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
        const { id, uid } = account;
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM account WHERE id='${id}' AND uid='${uid}'`,
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


    async addTransaction(data) {
        const { account, categoryId, date, isExpense, oldValue, subCategory, uid, value, wasExpense, description, imageIcon } = data;
        const imageId = imageIcon ?`"${imageIcon.id}"` : "3";
        const desc = description ? `"${description}"` : null;

        const query = `INSERT INTO transactions (uid, accountId, date, categoryId, subCategoryId, value, oldValue, isExpense, wasExpense, imageIconId, description) 
        VALUES ("${uid}","${account}","${moment(date).format("YYYY-MM-DD")}","${categoryId}","${subCategory.id}","${value}","${oldValue}",
                "${isExpense ? 1 : 0}","${wasExpense ? 1 : 0}",${imageId}, ${desc}
        )`;
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
                    INNER JOIN account on account.id = transactions.accountId
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
                            data.push({
                                ...row,
                                isExpense: row.isExpense === 1 ? true : false,
                                wasExpense: row.wasExpense === 1 ? true : false,
                                subCategory: { id: row.subCategoryId, value: row.subCategoryValue },
                                imageIcon: { id: row.imageIconId, name: row.imageIconeName },
                                account: {
                                    id: row.account, firebaseId: row.accountFirebaseid, name: row.accountName, value: row.accountValue, description: row.accountDescription, 
                                    currency: { id: row.accountCurrencyId, name: row.accountCurrency },
                                    type: { id: row.accountTypeId, name: row.accountTypeName }
                                }
                            });
                        }
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getTransactionsByDate]>>> ${err}`) });
        });
    }

    async getTransactionsByDateRange(dateStart, dateEnd) {
        const uid = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_ID);

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
                    INNER JOIN account on account.id = transactions.accountId
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
                            data.push({
                                ...row,
                                isExpense: row.isExpense === 1 ? true : false,
                                wasExpense: row.wasExpense === 1 ? true : false,
                                subCategory: { id: row.subCategoryId, value: row.subCategoryValue },
                                imageIcon: { id: row.imageIconId, name: row.imageIconeName },
                                account: {
                                    id: row.account, firebaseId: row.accountFirebaseid, name: row.accountName, value: row.accountValue, description: row.accountDescription,
                                    currency: { id: row.accountCurrencyId, name: row.accountCurrency },
                                    type: { id: row.accountTypeId, name: row.accountTypeName }
                                }
                            });
                        }
                        resolve(data);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][getTransactionsByDateRange]>>> ${err}`) });
        });
    }

    async updateTransaction(transaction) {
        const { id, account, categoryId, date, isExpense, oldValue, subCategory, uid, value, wasExpense, description, imageIcon, firebaseId } = transaction;
        const imageId = imageIcon ? `"${imageIcon.id}"` : "3";
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
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM transactions WHERE id="${transaction.id}" AND uid="${transaction.uid}"`,
                    [],
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][removeTransaction]>>> ${err}`) });
        });
    }

    async addOrReplaceUser(user) {
        const {id, mail, language, currency, version } = user;
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `INSERT OR REPLACE INTO user (id, mail, language, currency, version) VALUES (?,?,?,?,?)`,
                    [id, mail, language, currency, version],
                    (tx, results) => {
                        resolve(results);
                    });
            },
                (err) => { console.log(`[error][sqLite][service][addUser]>>> ${err}`) });
        });
    }

    async getUser(user){
        return new Promise((resolve, reject) => {
            config.db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM user WHERE id = "${user.id}"`,
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