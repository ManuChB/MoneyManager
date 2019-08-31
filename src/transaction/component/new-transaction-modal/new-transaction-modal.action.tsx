import { NEW_TRANSACTION_INITIALIZE_FINISH, NEW_TRANSACTION_INITIALIZE_START, CHANGE_DATA, 
    SET_CATEGORIES, NEW_TRANSACTION_SET_ACCOUNTS, NEW_TRANSACTION_SET_ICONS } from './new-transaction-modal.constant';
import { ITransactionDetailAction } from './new-transaction-modal.model';

const newTransactionAction: ITransactionDetailAction = {
    newTransactionInitializeStart(initialState) {
        return {
            type: NEW_TRANSACTION_INITIALIZE_START,
            value: initialState
        }
    },

    newTransactionInitializeFinish() {
        return {
            type: NEW_TRANSACTION_INITIALIZE_FINISH
        }
    },

    changeData(newData) {
        return {
            type: CHANGE_DATA,
            value: newData
        }
    },

    setCategories(categores) {
        return {
            type: SET_CATEGORIES,
            value: categores
        }
    },

    setAccounts(accounts) {
        return {
            type: NEW_TRANSACTION_SET_ACCOUNTS,
            value: accounts
        }
    },

    setIcons(icons) {
        return {
            type: NEW_TRANSACTION_SET_ICONS,
            value: icons
        }
    }
}

export default newTransactionAction;