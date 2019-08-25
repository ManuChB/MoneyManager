import transactionListConstants from './transaction-list.constant';
import { ITransactionListAction } from './transaction-list.model';

const transactionListAction: ITransactionListAction = {
    transactionListInitializeStart() {
        return {
            type: transactionListConstants.TRANSACTION_LIST_INITIALIZE_FINISH
        }
    },

    transactionListInitializeFinish() {
        return {
            type: transactionListConstants.TRANSACTION_LIST_INITIALIZE_START
        }
    },
    changeTimeFormat(time) {
        return {
            type: transactionListConstants.CHANGE_TIME_SCREEN,
            value: time
        }
    },
    activateDeleteMode() {
        return {
            type: transactionListConstants.TRANSACTION_LIST_ACTIVATE_DELETE_MODE
        }
    },
    desactivateDeleteMode() {
        return {
            type: transactionListConstants.TRANSACTION_LIST_DESACTIVATE_DELETE_MODE
        }
    },
    addTransactionToDeleteList(transaction) {
        return {
            type: transactionListConstants.TRANSACTION_LIST_ADD_TO_DELETE_LIST,
            value: transaction
        }
    },
    removeTransactionFromDeleteList(transaction) {
        return {
            type: transactionListConstants.TRANSACTION_LIST_REMOVE_FROM_DELETE_LIST,
            value: transaction
        }
    },
    longPress(transaction) {
        return {
            type: transactionListConstants.TRANSACTION_LIST_LONG_PRESS,
            value: transaction
        }
    },
    setTransactionsByCategory(transaction) {
        return {
            type: transactionListConstants.TRANSACTION_LIST_SET_LIST_BY_CATEGORY,
            value: transaction
        }
    },

}

export default transactionListAction;