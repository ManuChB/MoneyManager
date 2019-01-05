import { DAY_TRANSACTION_INITIALIZE_FINISH, DAY_TRANSACTION_INITIALIZE_START, 
    CHANGE_DATE, SET_DAY_TRANSACTIONS, SAVE_NEW_TRANSACTION, SHOW_DETAIL_MODAL,
    UPDATE_TRANSACTION, SET_TRANSACTION_TO_DETAIL } from './day-transaction.constant';
import { IDayTransactionAction } from './day-transaction.model';

const dayTransactionAction: IDayTransactionAction = {
    dayTransactionInitializeStart() {
        console.log(`[day-transaction][action][initializeStart]`);
        return {
            type: DAY_TRANSACTION_INITIALIZE_START
        }
    },

    dayTransactionInitializeFinish() {
        console.log(`[day-transaction][action][initializeFinish]`);
        return {
            type: DAY_TRANSACTION_INITIALIZE_FINISH
        }
    },

    changeDay(newDate) {
        console.log(`[day-transaction][action][changeDay]`);
        return {
            type: CHANGE_DATE,
            value: newDate
        }
    },

    setDayTransactions(transactions) {
        console.log(`[day-transaction][action][changeDay]`);
        return {
            type: SET_DAY_TRANSACTIONS,
            value: transactions
        }
    },

    saveNewTransaction(transaction) {
        console.log(`[day-transaction][action][saveNewTransaction]`);
        return {
            type: SAVE_NEW_TRANSACTION,
            value: transaction
        }
    },
    showDetailModal(showModal) {
        console.log(`[day-transaction][action][showDetailModal]`);
        return {
            type: SHOW_DETAIL_MODAL,
            value: showModal
        }
    },
    updateTransaction(transaction) {
        console.log(`[day-transaction][action][updateTransaction]`);
        return {
            type: UPDATE_TRANSACTION,
            value: transaction
        }
    },
    setTransactionToDetail(transaction) {
        console.log(`[day-transaction][action][setTransactionToDetail]`);
        return {
            type: SET_TRANSACTION_TO_DETAIL,
            value: transaction
        }
    }
}

export default dayTransactionAction;