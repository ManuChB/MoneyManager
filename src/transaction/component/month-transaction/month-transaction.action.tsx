import { MONTH_TRANSACTION_INITIALIZE_FINISH, MONTH_TRANSACTION_INITIALIZE_START } from './month-transaction.constant';
import { IMonthTransactionAction } from './month-transaction.model';

const splashAction: IMonthTransactionAction = {
    monthTransactionInitializeStart() {
        return {
            type: MONTH_TRANSACTION_INITIALIZE_FINISH
        }
    },

    monthTransactionInitializeFinish() {
        return {
            type: MONTH_TRANSACTION_INITIALIZE_START
        }
    }

}

export default splashAction;