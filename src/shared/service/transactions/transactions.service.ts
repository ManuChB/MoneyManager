import _ from 'lodash';
import { ITransactionDataProp } from '../../../transaction/component/transaction/transaction.component';
import FirebaseService from '../firebase/firebase.service';
import appConstants from '../../../appConstants';
import NavigationService from '../navigation/navigation.service';

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
                if (element.isExpense) {
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
                return await FirebaseService.addToCollection(appConstants.collection.transactions,
                    { ...transaction, date: transaction.date.toDate(), account: transaction.account.id });
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
                    { ...transaction, date: transaction.date.toDate(), account: transaction.account.id, oldValue: 0 });
            }
        } catch (e) {
            console.log(`[error][transactionService][updateTransaction]>>> ${e}`);
        }
    }

    
    async getTransactionByDate(date) {
        try {
            const toDate = date.toDate();
            toDate.setHours(0, 0, 0, 0);
            return await FirebaseService.getTransactionsByDate(toDate);

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
            return await FirebaseService.getTransactionsByDateRange(toDateStart, toDateEnd);

        } catch (e) {
            console.log(`[error][transactionService][getTransactionByDateRange]>>> ${e}`);
        }
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

    
    async transactionToDetail(transaction, onSave) {
    try {
        await NavigationService.navigateTo(appConstants.routName.newTransaction,
            {
                data: transaction,
                onClose: NavigationService.navigateBack,
                onSave: onSave
            }
        );
    } catch (e) {
        console.log(`[error][transactionService][transactionToDetail]>>> ${e}`);
    }
}
}

export default new TransactionService();