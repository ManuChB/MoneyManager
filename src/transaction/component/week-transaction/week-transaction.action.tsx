import { WEEK_TRANSACTION_INITIALIZE_FINISH, WEEK_TRANSACTION_INITIALIZE_START, 
    WEEK_TRANSACTION_NEW_TRANSACTION, WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL } from './week-transaction.constant';
import { IWeekTransactionAction } from './week-transaction.model';

const weekTransactionAction: IWeekTransactionAction = {
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
    },
    weekTransactionNewTransaction(transaction) {
        console.log(`[day-transaction][action][updateTransaction]`, transaction);
        return {
            type: WEEK_TRANSACTION_NEW_TRANSACTION,
            value: transaction
        }
    },
    weekTransactionSetTransactionToDetail(transaction, onSave) {
        console.log(`[day-transaction][action][setTransactionToDetail]`);
        return {
            type: WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL,
            value: { transaction, onSave }
        }
    },

}

export default weekTransactionAction;