import { MONTH_TRANSACTION_INITIALIZE_FINISH, MONTH_TRANSACTION_INITIALIZE_START } from './month-transaction.constant';
import { IMonthTransactionAction } from './month-transaction.model';

const splashAction: IMonthTransactionAction = {
    monthTransactionInitializeStart() {
        console.log(`[month-transaction][action][initializeStart]`);
        return {
            type: MONTH_TRANSACTION_INITIALIZE_FINISH
        }
    },

    monthTransactionInitializeFinish() {
        console.log(`[month-transaction][action][initializeFinish]`);
        return {
            type: MONTH_TRANSACTION_INITIALIZE_START
        }
    }

}

export default splashAction;