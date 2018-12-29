import { YEAR_TRANSACTION_INITIALIZE_FINISH, YEAR_TRANSACTION_INITIALIZE_START } from './year-transaction.constant';
import { IYearTransactionAction } from './year-transaction.model';

const splashAction: IYearTransactionAction = {
    yearTransactionInitializeStart() {
        console.log(`[year-transaction][action][initializeStart]`);
        return {
            type: YEAR_TRANSACTION_INITIALIZE_FINISH
        }
    },

    yearTransactionInitializeFinish() {
        console.log(`[year-transaction][action][initializeFinish]`);
        return {
            type: YEAR_TRANSACTION_INITIALIZE_START
        }
    }

}

export default splashAction;