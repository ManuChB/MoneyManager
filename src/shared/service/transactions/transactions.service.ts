import _ from 'lodash';
import { ITransactionDataProp } from '../../../transaction/component/transaction/transaction.component';
import FirebaseService from '../firebase/firebase.service';
import appConstants from '../../../appConstants';
import NavigationService from '../navigation/navigation.service';
import AsyncStorageService from '../async-storage/async-storage.service';
import moment from 'moment';
import sqLiteService from '../sqLite/sqLite.service';
import AccountService from "../account/account.service";

let _this;
class TransactionService {
    constructor() {
        _this = this;
    }

    calculateBalance(transactions: Array<ITransactionDataProp>):{income: number, expense: number, balance: number} {
        try {
            var income = 0;
            var expense = 0;
            var balance = 0;
            if(transactions.length > 0) {
                transactions.forEach(element => {
                    if (element.isExpense || element.value < 0.00) {
                        expense += element.value;
                    } else {
                        income += element.value;
                    }
                });
                balance = income - expense;
            }
            return { income, expense, balance }
        } catch (e) {
            console.log(`[error][TransactionService][calculateBalance]>>> ${e}`);
        }
    }

    async newTransaction(transaction) {
        try {
            if (transaction.id.toString().includes(appConstants.localId.transaction)) {
                const uid = await AsyncStorageService.getItem('USER_ID');
                const trans = { ...transaction, date: transaction.date.toDate(), account: transaction.account.id, uid: uid }
                const insertId = await sqLiteService.addTransaction(trans);
                const item = await FirebaseService.addToCollection(appConstants.collection.transactions, { ...trans, id: insertId });
                await sqLiteService.updateTransaction({ ...trans, id: insertId, firebaseId: item.id });
                await _this.updateAccountValue({ ...transaction, uid: uid} );
            }
        } catch (e) {
            console.log(`[error][TransactionService][newTransaction]>>> ${e}`);
        }
    }

    async updateTransaction(transaction, date) {

        try {
            if (transaction.id.toString().includes(appConstants.localId.transaction)) {
                await _this.newTransaction(transaction);
            } else {
                const trans = { ...transaction, date: moment(transaction.date).toDate(), account: transaction.account.id };
                console.log(`-------------------updateTransaction>>> `, transaction);
                await _this.updateAccountValue(transaction);
                await sqLiteService.updateTransaction(trans);
                FirebaseService.updateDocumentInCollection(appConstants.collection.transactions, trans);
            }
        } catch (e) {
            console.log(`[error][transactionService][updateTransaction]>>> ${e}`);
        }
    }

    
    async getTransactionByDate(date) {
        try {
            const toDate = date.toDate();
            toDate.setHours(0, 0, 0, 0);
            const list = await sqLiteService.getTransactionsByDate(toDate);
            await _this.orderTransactionByCategory(list);
            return list;
        } catch (e) {
            console.log(`[error][transactionService][getTransactionByDate]>>> ${e}`);
        }
    }

    async getTransactionByDateRange(dateStart, dateEnd) {
        try {
            const toDateStart = dateStart.toDate();
            const toDateEnd = dateEnd.toDate();
            toDateStart.setHours(0, 0, 0, 0);
            toDateEnd.setHours(0, 0, 0, 0);
            const list = await sqLiteService.getTransactionsByDateRange(toDateStart, toDateEnd);
            await _this.orderTransactionByCategory(list); 
            return list;
        } catch (e) {
            console.log(`[error][transactionService][getTransactionByDateRange]>>> ${e}`);
        }
    }

    async orderTransactionByCategory(list){
        let array = [];
        if(list.length > 0){
            const categories = await sqLiteService.getAllCategories();
            categories.forEach(category => {
                let arr = list.filter(
                    (transaction) => transaction.categoryId == category.id
                )
                const balance = _this.calculateBalance(arr);

                array.push({ category, data: arr, balance });
            });
        }
        await AsyncStorageService.setItem(appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY, array);
    }

    async updateAccountValue(transaction) {
        try {
            let { oldValue, value, account, isExpense, wasExpense } = transaction;

            if (!oldValue) { oldValue = 0 };
            if (_.isNil(wasExpense)) { wasExpense = isExpense };

            let newValue = 0;
            if (isExpense && wasExpense) {
                newValue = account.value + oldValue - value;
            }
            else if (!isExpense && !wasExpense) {
                newValue = account.value - oldValue + value;
            }
            else if (!isExpense && wasExpense) {
                newValue = account.value + oldValue + value;
            }
            else if (isExpense && !wasExpense) {
                newValue = account.value - oldValue - value;
            }
            console.log(`-------------------updateAccountValue>>> `, transaction, newValue);

            await AccountService.updateAccount({ ...account, value: newValue.toFixed(2), uid: transaction.uid })

        } catch (e) {
            console.log(`[error][TransactionService][updateAccountValue]>>> ${e}`);
        }
    }

    
    async transactionToDetail(transaction, onSave, onRemove) {
        try {
            await NavigationService.navigateTo(appConstants.routName.newTransaction,
                {
                    data: transaction,
                    onClose: NavigationService.navigateBack,
                    onSave: onSave,
                    onRemove: onRemove
                }
            );
        } catch (e) {
            console.log(`[error][transactionService][transactionToDetail]>>> ${e}`);
        }
    }

    async removeTransaction(transaction) {
        try {
            await sqLiteService.removeTransaction(transaction);
            const value = transaction.isExpense ? transaction.account.value + transaction.value : transaction.account.value - transaction.value;
            AccountService.updateAccount({ ...transaction.account, value, uid: transaction.uid })

            FirebaseService.removeFromCollection(appConstants.collection.transactions, transaction);
        } catch (e) {
            console.log(`[error][transactionService][removeTransaction]>>> ${e}`);
        }
    }
}

export default new TransactionService();