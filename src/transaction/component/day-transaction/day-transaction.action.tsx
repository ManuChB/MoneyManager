import { DAY_TRANSACTION_INITIALIZE_FINISH, DAY_TRANSACTION_INITIALIZE_START } from './day-transaction.constant';
import { IDayTransactionAction } from './day-transaction.model';

const splashAction: IDayTransactionAction = {
    dayTransactionInitializeStart() {
        console.log(`[day-transaction][action][initializeStart]`);
        return {
            type: DAY_TRANSACTION_INITIALIZE_FINISH
        }
    },

    dayTransactionInitializeFinish() {
        console.log(`[day-transaction][action][initializeFinish]`);
        return {
            type: DAY_TRANSACTION_INITIALIZE_START
        }
    }

}

export default splashAction;