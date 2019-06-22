import { YEAR_TRANSACTION_INITIALIZE_FINISH, YEAR_TRANSACTION_INITIALIZE_START } from './year-transaction.constant';
import { IYearTransactionAction } from './year-transaction.model';

const splashAction: IYearTransactionAction = {
    yearTransactionInitializeStart() {
        return {
            type: YEAR_TRANSACTION_INITIALIZE_FINISH
        }
    },

    yearTransactionInitializeFinish() {
        return {
            type: YEAR_TRANSACTION_INITIALIZE_START
        }
    }

}

export default splashAction;