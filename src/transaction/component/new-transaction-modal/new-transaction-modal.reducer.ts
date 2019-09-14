import newTransactionConstants from './new-transaction-modal.constant';
import { AnyAction } from 'redux';
import { ITransactionDetailState } from './new-transaction-modal.model';

export const initialState: ITransactionDetailState = {
    isInitialized: false,
    data: {},
    onClose: null,
    onSave: null,
    categories: [],
    accounts: [],
    onRemove: null,
    icons: [],
    getTransactions: null,
    showDeleteModal: false

};

export default function newTransaction(state: ITransactionDetailState = initialState, action: AnyAction) {
    switch (action.type) {
        case newTransactionConstants.NEW_TRANSACTION_INITIALIZE_START:
            return {
                ...state,
                isInitialized: true,
                data: action.value.data,
                onClose: action.value.onClose,
                onSave: action.value.onSave,
                onRemove: action.value.onRemove,
                getTransactions: action.value.getTransactions
            };
        case newTransactionConstants.NEW_TRANSACTION_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case newTransactionConstants.CHANGE_DATA:
            return {
                ...state,
                data: action.value
            };
        case newTransactionConstants.SET_CATEGORIES:
            return {
                ...state,
                categories: action.value
            };
        case newTransactionConstants.NEW_TRANSACTION_SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.value
            };
        case newTransactionConstants.NEW_TRANSACTION_SET_ICONS:
            return {
                ...state,
                icons: action.value
            };
        case newTransactionConstants.NEW_TRANSACTION_SHOW_DELETE_MODAL:
            return {
                ...state,
                showDeleteModal: true
            };
        case newTransactionConstants.NEW_TRANSACTION_HIDE_DELETE_MODAL:
            return {
                ...state,
                showDeleteModal: false
            };
        default:
            return state
    }
}