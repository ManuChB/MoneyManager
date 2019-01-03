import { DAY_TRANSACTION_INITIALIZE_FINISH, DAY_TRANSACTION_INITIALIZE_START, CHANGE_DATE, SET_DAY_TRANSACTIONS } from './day-transaction.constant';
import { IDayTransactionAction } from './day-transaction.model';

const dayTransactionAction: IDayTransactionAction = {
    dayTransactionInitializeStart() {
        console.log(`[day-transaction][action][initializeStart]`);
        return {
            type: DAY_TRANSACTION_INITIALIZE_START
        }
    },

    dayTransactionInitializeFinish() {
        console.log(`[day-transaction][action][initializeFinish]`);
        return {
            type: DAY_TRANSACTION_INITIALIZE_FINISH
        }
    },

    changeDay(newDate) {
        console.log(`[day-transaction][action][changeDay]`);
        return {
            type: CHANGE_DATE,
            value: newDate
        }
    },

    setDayTransactions(transactions) {
        console.log(`[day-transaction][action][changeDay]`);
        return {
            type: SET_DAY_TRANSACTIONS,
            value: transactions
        }
    }
}

export default dayTransactionAction;