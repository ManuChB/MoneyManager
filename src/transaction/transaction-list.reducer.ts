import transactionListConstants from './transaction-list.constant';
import { AnyAction } from 'redux';
import { ITransactionListState } from './transaction-list.model';
import appConstants from '../appConstants';
import { ITransactionDataProp } from './component/transaction/transaction.component';

export const initialState: ITransactionListState = {
    isInitialized: false,
    timeMode: appConstants.timeMode.day,
    deleteMode: false,
    toDeleteList: new Array<ITransactionDataProp>(),
    transactionsByCategory: []
};

export default function transactionList(state: ITransactionListState = initialState, action: AnyAction) {
    switch (action.type) {
        case transactionListConstants.TRANSACTION_LIST_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: false
            };
        case transactionListConstants.TRANSACTION_LIST_INITIALIZE_START:
            return {
                ...state,
                isInitialized: true
            };
        case transactionListConstants.CHANGE_TIME_SCREEN:
            return {
                ...state,
                timeMode: action.value
            };
        case transactionListConstants.TRANSACTION_LIST_ACTIVATE_DELETE_MODE:
            return {
                ...state,
                deleteMode: true
            };
        case transactionListConstants.TRANSACTION_LIST_DESACTIVATE_DELETE_MODE:
            return {
                ...state,
                deleteMode: false
            };
        case transactionListConstants.TRANSACTION_LIST_ADD_TO_DELETE_LIST:
            return {
                ...state,
                toDeleteList: state.toDeleteList.push(action.value)
            };
        case transactionListConstants.TRANSACTION_LIST_REMOVE_FROM_DELETE_LIST:
            return {
                ...state,
                toDeleteList: state.toDeleteList.filter(
                    (transaction) => transaction.id !== action.value.id
                )
            };
        case transactionListConstants.TRANSACTION_LIST_LONG_PRESS:

            return {
                ...state
            };
        case transactionListConstants.TRANSACTION_LIST_SET_LIST_BY_CATEGORY:
            return {
                ...state,
                transactionsByCategory: action.value
            }
        default:
            return state
    }
}