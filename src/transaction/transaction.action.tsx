import { TRANSACTION_INITIALIZE_FINISH, TRANSACTION_INITIALIZE_START } from './transaction.constant';
import { ITransactionProp } from './transaction.model';

const splashAction: ITransactionProp = {
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
    }

}

export default splashAction;