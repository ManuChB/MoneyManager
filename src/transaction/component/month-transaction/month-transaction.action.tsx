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
    monthTransactionNewTransaction(transaction, monthStart, monthEnd) {
        return {
            type: monthTransConstants.MONTH_TRANSACTION_NEW_TRANSACTION,
            value: { transaction, monthStart, monthEnd }
        }
    },
    monthTransactionSetTransactionToDetail(transaction, onSave) {
        return {
            type: monthTransConstants.MONTH_TRANSACTION_SET_TRANSACTION_TO_DETAIL,
            value: { transaction, onSave }
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
    updateMonthTransaction(transaction) {
        return {
            type: monthTransConstants.UPDATE_MONTH_TRANSACTION,
            value: transaction
        }
    },
    setMonthTransactionToDetail(transaction, onSave) {
        return {
            type: monthTransConstants.SET_MONTH_TRANSACTION_TO_DETAIL,
            value: { transaction, onSave }
        }
    }

}

export default splashAction;