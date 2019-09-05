import dayTransactionsConstants from './day-transaction.constant';
import { IDayTransactionAction } from './day-transaction.model';
import dayTransactionConstant from './day-transaction.constant';

const dayTransactionAction: IDayTransactionAction = {
    dayTransactionInitializeStart() {
        return {
            type: dayTransactionsConstants.DAY_TRANSACTION_INITIALIZE_START
        }
    },

    dayTransactionInitializeFinish() {
        return {
            type: dayTransactionsConstants.DAY_TRANSACTION_INITIALIZE_FINISH
        }
    },

    changeDay(newDate) {
        return {
            type: dayTransactionsConstants.CHANGE_DATE,
            value: newDate
        }
    },

    setDayTransactions(transactions) {
        return {
            type: dayTransactionsConstants.SET_DAY_TRANSACTIONS,
            value: transactions
        }
    },
    setBalanceInfo(income, expense, balance) {
        return {
            type: dayTransactionsConstants.SET_BALANCE_INFO,
            value: { income, expense, balance }
        }
    },
    dayTransSetUserCurrency(currency) {
        return {
            type: dayTransactionConstant.DAY_TRANSACTION_SET_USER_CURRENCY,
            value: currency
        }
    }

}

export default dayTransactionAction;