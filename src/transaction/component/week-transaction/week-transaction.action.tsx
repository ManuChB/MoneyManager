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
    weekTransSetUserCurrency(currency) {
        return {
            type: weekTransactionConstants.WEEK_TRANSACTION_SET_USER_CURRENCY,
            value: currency
        }
    }
}

export default weekTransactionAction;