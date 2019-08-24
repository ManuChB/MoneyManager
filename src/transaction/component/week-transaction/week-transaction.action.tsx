import weekTransactionConstants from './week-transaction.constant';
import { IWeekTransactionAction } from './week-transaction.model';

const weekTransactionAction: IWeekTransactionAction = {
    weekTransactionInitializeStart() {
        return {
            type: weekTransactionConstants.WEEK_TRANSACTION_INITIALIZE_START
        }
    },

    weekTransactionInitializeFinish() {
        return {
            type: weekTransactionConstants.WEEK_TRANSACTION_INITIALIZE_FINISH
        }
    },
    weekTransactionNewTransaction(transaction, weekStart, weekEnd) {
        return {
            type: weekTransactionConstants.WEEK_TRANSACTION_NEW_TRANSACTION,
            value: {transaction, weekStart, weekEnd}
        }
    },
    changeWeek(weekStart, weekEnd) {
        return {
            type: weekTransactionConstants.CHANGE_WEEK,
            value: { weekStart, weekEnd }
        }
    },

    setWeekTransactions(transactions) {
        return {
            type: weekTransactionConstants.SET_WEEK_TRANSACTIONS,
            value: transactions
        }
    },
    setBalanceInfo(income, expense, balance) {
        return {
            type: weekTransactionConstants.SET_WEEK_BALANCE_INFO,
            value: { income, expense, balance }
        }
    },
    updateWeekTransaction(transaction) {
        return {
            type: weekTransactionConstants.UPDATE_WEEK_TRANSACTION,
            value: transaction
        }
    },
    setWeekTransactionToDetail(transaction, onSave, onRemove) {
        return {
            type: weekTransactionConstants.SET_WEEK_TRANSACTION_TO_DETAIL,
            value: { transaction, onSave, onRemove }
        }
    },
    removeTransaction(transaction) {
        return {
            type: weekTransactionConstants.WEEK_TRANSACTION_REMOVE_TRANSACTION,
            value: transaction
        }
    },
    weekTransSetUserCurrency(currency) {
        return {
            type: weekTransactionConstants.WEEK_TRANSACTION_SET_USER_CURRENCY,
            value: currency
        }
    }
}

export default weekTransactionAction;