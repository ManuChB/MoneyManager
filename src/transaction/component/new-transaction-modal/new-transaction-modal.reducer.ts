import { NEW_TRANSACTION_INITIALIZE_START, NEW_TRANSACTION_INITIALIZE_FINISH, CHANGE_DATA, 
    SET_CATEGORIES, NEW_TRANSACTION_SET_ACCOUNTS } from './new-transaction-modal.constant';
import { AnyAction } from 'redux';
import { ITransactionDetailState } from './new-transaction-modal.model';

export const initialState: ITransactionDetailState = {
    isInitialized: false,
    data: {},
    onClose: null,
    onSave: null,
    categories: [],
    accounts: []

};

export default function newTransaction(state: ITransactionDetailState = initialState, action: AnyAction) {
    switch (action.type) {
        case NEW_TRANSACTION_INITIALIZE_START:
            return {
                ...state,
                isInitialized: true,
                data: action.value.data,
                onClose: action.value.onClose,
                onSave: action.value.onSave
            };
        case NEW_TRANSACTION_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case CHANGE_DATA:
            return {
                ...state,
                data: action.value
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.value
            };
        case NEW_TRANSACTION_SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.value
            };
        default:
            return state
    }
}