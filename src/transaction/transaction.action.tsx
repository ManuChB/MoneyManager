import { TRANSACTION_INITIALIZE_FINISH, TRANSACTION_INITIALIZE_START, CHANGE_TIME_SCREEN } from './transaction.constant';
import { ITransactionAction } from './transaction.model';

const splashAction: ITransactionAction = {
    transactionInitializeStart() {
        console.log(`[transaction][action][initializeStart]`);
        return {
            type: TRANSACTION_INITIALIZE_FINISH
        }
    },

    transactionInitializeFinish() {
        console.log(`[transaction][action][initializeFinish]`);
        return {
            type: TRANSACTION_INITIALIZE_START
        }
    },
    changeTimeFormat(time) {
        console.log(`[transaction][action][changeTimeFormat]`);
        return {
            type: CHANGE_TIME_SCREEN,
            value: time
        }
    }

}

export default splashAction;