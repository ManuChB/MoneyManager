import { WEEK_TRANSACTION_INITIALIZE_FINISH, WEEK_TRANSACTION_INITIALIZE_START } from './week-transaction.constant';
import { IWeekTransactionAction } from './week-transaction.model';

const splashAction: IWeekTransactionAction = {
    weekTransactionInitializeStart() {
        console.log(`[week-transaction][action][initializeStart]`);
        return {
            type: WEEK_TRANSACTION_INITIALIZE_FINISH
        }
    },

    weekTransactionInitializeFinish() {
        console.log(`[week-transaction][action][initializeFinish]`);
        return {
            type: WEEK_TRANSACTION_INITIALIZE_START
        }
    }

}

export default splashAction;