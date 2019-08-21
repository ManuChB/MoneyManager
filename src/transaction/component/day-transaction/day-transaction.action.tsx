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

    saveNewTransaction(transaction) {
        return {
            type: dayTransactionsConstants.SAVE_NEW_TRANSACTION,
            value: transaction
        }
    },
    showDetailModal(showModal) {
        return {
            type: dayTransactionsConstants.SHOW_DETAIL_MODAL,
            value: showModal
        }
    },
    updateTransaction(transaction) {
        return {
            type: dayTransactionsConstants.UPDATE_TRANSACTION,
            value: transaction
        }
    },
    setTransactionToDetail(transaction, onSave, onRemove) {
        return {
            type: dayTransactionsConstants.SET_TRANSACTION_TO_DETAIL,
            value: {transaction, onSave, onRemove}
        }
    },
    setBalanceInfo(income, expense, balance) {
        return {
            type: dayTransactionsConstants.SET_BALANCE_INFO,
            value: { income, expense, balance }
        }
    },
    longPress(transaction) {
        return {
            type: dayTransactionConstant.DAY_TRANSACTION_LONG_PRESS,
            value: transaction
        }
    },
    removeTransaction(transaction) {
        return {
            type: dayTransactionConstant.REMOVE_TRANSACTION,
            value: transaction
        }
    }

}

export default dayTransactionAction;