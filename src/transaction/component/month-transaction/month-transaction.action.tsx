import  monthTransConstants from './month-transaction.constant';
import { IMonthTransactionAction } from './month-transaction.model';

const splashAction: IMonthTransactionAction = {
    monthTransactionInitializeStart() {
        return {
            type: monthTransConstants.MONTH_TRANSACTION_INITIALIZE_START
        }
    },

    monthTransactionInitializeFinish() {
        return {
            type: monthTransConstants.MONTH_TRANSACTION_INITIALIZE_FINISH
        }
    },
    changeMonth(monthStart, monthEnd) {
        return {
            type: monthTransConstants.CHANGE_MONTH,
            value: { monthStart, monthEnd }
        }
    },

    setMonthTransactions(transactions) {
        return {
            type: monthTransConstants.SET_MONTH_TRANSACTIONS,
            value: transactions
        }
    },
    setBalanceInfo(income, expense, balance) {
        return {
            type: monthTransConstants.SET_MONTH_BALANCE_INFO,
            value: { income, expense, balance }
        }
    },
    monthTransSetUserCurrency(currency) {
        return {
            type: monthTransConstants.MONTH_TRANSACTION_SET_USER_CURRENCY,
            value: currency
        }
    }

}

export default splashAction;