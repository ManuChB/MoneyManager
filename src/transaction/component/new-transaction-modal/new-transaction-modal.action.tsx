import { NEW_TRANSACTION_INITIALIZE_FINISH, NEW_TRANSACTION_INITIALIZE_START, CHANGE_DATA, 
    SET_CATEGORIES, NEW_TRANSACTION_SET_ACCOUNTS } from './new-transaction-modal.constant';
import { ITransactionDetailAction } from './new-transaction-modal.model';

const newTransactionAction: ITransactionDetailAction = {
    newTransactionInitializeStart(initialState) {
        console.log(`[new-transaction][action][initializeStart]`, initialState);
        return {
            type: NEW_TRANSACTION_INITIALIZE_START,
            value: initialState
        }
    },

    newTransactionInitializeFinish() {
        console.log(`[new-transaction][action][initializeFinish]`);
        return {
            type: NEW_TRANSACTION_INITIALIZE_FINISH
        }
    },

    changeData(newData) {
        console.log(`[new-transaction][action][changeData]`, newData);
        return {
            type: CHANGE_DATA,
            value: newData
        }
    },

    setCategories(categores) {
        console.log(`[new-transaction][action][changeData]`, categores);
        return {
            type: SET_CATEGORIES,
            value: categores
        }
    },

    setAccounts(accounts) {
        console.log(`[new-transaction][action][setAccounts]`, accounts);
        return {
            type: NEW_TRANSACTION_SET_ACCOUNTS,
            value: accounts
        }
    }
}

export default newTransactionAction;