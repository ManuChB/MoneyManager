import _ from 'lodash';
import { ITransactionDataProp } from '../../../transaction/component/transaction/transaction.component';
import FirebaseService from '../firebase/firebase.service';
import appConstants from '../../../appConstants';
import NavigationService from '../navigation/navigation.service';
import AsyncStorageService from '../async-storage/async-storage.service';
import moment from 'moment';

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
            transactions.forEach(element => {
                if (element.isExpense || element.value < 0.00) {
                    expense += element.value;
                } else {
                    income += element.value;
                }
            });
            balance = income - expense;
            return { income, expense, balance }
        } catch (e) {
            console.log(`[error][TransactionService][calculateBalance]>>> ${e}`);
        }
    }

    async newTransaction(transaction) {
        try {
            if (transaction.id.includes(appConstants.localId.transaction)) {
                const uid = await AsyncStorageService.getItem('USER_ID');
                return await FirebaseService.addToCollection(appConstants.collection.transactions,
                    { ...transaction, date: transaction.date.toDate(), account: transaction.account.id, uid: uid });
            }
        } catch (e) {
            console.log(`[error][TransactionService][newTransaction]>>> ${e}`);
        }
    }

    async updateTransaction(transaction, date) {
        try {
            if (transaction.id.includes(appConstants.localId.transaction)) {
                await _this.newTransaction(transaction);
            } else {
                await _this.updateAccountValue(transaction);
                await FirebaseService.updateDocumentInCollection(appConstants.collection.transactions,
                    { ...transaction, date: moment(transaction.date).toDate(), account: transaction.account.id, oldValue: 0 });
            }
        } catch (e) {
            console.log(`[error][transactionService][updateTransaction]>>> ${e}`);
        }
    }

    
    async getTransactionByDate(date) {
        try {
            const toDate = date.toDate();
            toDate.setHours(0, 0, 0, 0);
            const list = await FirebaseService.getTransactionsByDate(toDate);
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
            const list = await FirebaseService.getTransactionsByDateRange(toDateStart, toDateEnd);
            await _this.orderTransactionByCategory(list); 
            return list;
        } catch (e) {
            console.log(`[error][transactionService][getTransactionByDateRange]>>> ${e}`);
        }
    }

    async orderTransactionByCategory(list){
        let array = [];
        const categories = await AsyncStorageService.getItem(appConstants.asyncStorageItem.CATEGORIES);
        categories.forEach(category => {
            let arr = list.filter(
                (transaction) => transaction.categoryId == category.id
            )
            const balance = _this.calculateBalance(arr);

            array.push({ category, data: arr, balance });
        });
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
            await FirebaseService.updateDocumentInCollection(appConstants.collection.accounts, { ...account, value: newValue })
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
            await FirebaseService.removeFromCollection(appConstants.collection.transactions, transaction);
        } catch (e) {
            console.log(`[error][transactionService][removeTransaction]>>> ${e}`);
        }
    }
}

export default new TransactionService();