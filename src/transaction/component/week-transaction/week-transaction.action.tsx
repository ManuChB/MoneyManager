import { WEEK_TRANSACTION_INITIALIZE_FINISH, WEEK_TRANSACTION_INITIALIZE_START, 
    WEEK_TRANSACTION_NEW_TRANSACTION, WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL, 
    SET_WEEK_TRANSACTIONS, CHANGE_WEEK, SET_WEEK_BALANCE_INFO } from './week-transaction.constant';
import { IWeekTransactionAction } from './week-transaction.model';

const weekTransactionAction: IWeekTransactionAction = {
    weekTransactionInitializeStart() {
        return {
            type: WEEK_TRANSACTION_INITIALIZE_START
        }
    },

    weekTransactionInitializeFinish() {
        return {
            type:WEEK_TRANSACTION_INITIALIZE_FINISH
        }
    },
    weekTransactionNewTransaction(transaction, weekStart, weekEnd) {
        return {
            type: WEEK_TRANSACTION_NEW_TRANSACTION,
            value: {transaction, weekStart, weekEnd}
        }
    },
    weekTransactionSetTransactionToDetail(transaction, onSave) {
        return {
            type: WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL,
            value: { transaction, onSave }
        }
    },
    changeWeek(weekStart, weekEnd) {
        return {
            type: CHANGE_WEEK,
            value: { weekStart, weekEnd }
        }
    },

    setWeekTransactions(transactions) {
        return {
            type: SET_WEEK_TRANSACTIONS,
            value: transactions
        }
    },
    setBalanceInfo(income, expense, balance) {
        return {
            type: SET_WEEK_BALANCE_INFO,
            value: { income, expense, balance }
        }
    },

}

export default weekTransactionAction;