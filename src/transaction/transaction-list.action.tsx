import { TRANSACTION_LIST_INITIALIZE_FINISH, TRANSACTION_LIST_INITIALIZE_START, CHANGE_TIME_SCREEN } from './transaction-list.constant';
import { ITransactionListAction } from './transaction-list.model';

const transactionListAction: ITransactionListAction = {
    transactionListInitializeStart() {
        console.log(`[transactionList][action][initializeStart]`);
        return {
            type: TRANSACTION_LIST_INITIALIZE_FINISH
        }
    },

    transactionListInitializeFinish() {
        console.log(`[transactionList][action][initializeFinish]`);
        return {
            type: TRANSACTION_LIST_INITIALIZE_START
        }
    },
    changeTimeFormat(time) {
        console.log(`[transactionList][action][changeTimeFormat]`);
        return {
            type: CHANGE_TIME_SCREEN,
            value: time
        }
    }

}

export default transactionListAction;