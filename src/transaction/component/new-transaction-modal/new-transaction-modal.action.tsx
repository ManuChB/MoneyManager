import newTransactionConstants from './new-transaction-modal.constant';
import { ITransactionDetailAction } from './new-transaction-modal.model';

const newTransactionAction: ITransactionDetailAction = {
    newTransactionInitializeStart(initialState) {
        return {
            type: newTransactionConstants.NEW_TRANSACTION_INITIALIZE_START,
            value: initialState
        }
    },

    newTransactionInitializeFinish() {
        return {
            type: newTransactionConstants.NEW_TRANSACTION_INITIALIZE_FINISH
        }
    },

    changeData(newData) {
        return {
            type: newTransactionConstants.CHANGE_DATA,
            value: newData
        }
    },

    setCategories(categores) {
        return {
            type: newTransactionConstants.SET_CATEGORIES,
            value: categores
        }
    },

    setAccounts(accounts) {
        return {
            type: newTransactionConstants.NEW_TRANSACTION_SET_ACCOUNTS,
            value: accounts
        }
    },

    setIcons(icons) {
        return {
            type: newTransactionConstants.NEW_TRANSACTION_SET_ICONS,
            value: icons
        }
    },

    newTransactionShowDeleteModal() {
        return {
            type: newTransactionConstants.NEW_TRANSACTION_SHOW_DELETE_MODAL
        }
    },

    newTransactionHideDeleteModal() {
        return {
            type: newTransactionConstants.NEW_TRANSACTION_HIDE_DELETE_MODAL
        }
    }
}

export default newTransactionAction;