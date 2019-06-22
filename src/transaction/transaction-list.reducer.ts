import { TRANSACTION_LIST_INITIALIZE_FINISH, TRANSACTION_LIST_INITIALIZE_START, CHANGE_TIME_SCREEN } from './transaction-list.constant';
import { AnyAction } from 'redux';
import { ITransactionListState } from './transaction-list.model';
import appConstants from '../appConstants';

export const initialState: ITransactionListState = {
    isInitialized: false,
    timeMode: appConstants.timeMode.day
};

export default function transactionList(state: ITransactionListState = initialState, action: AnyAction) {
    switch (action.type) {
        case TRANSACTION_LIST_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: false
            };
        case TRANSACTION_LIST_INITIALIZE_START:
            return {
                ...state,
                isInitialized: true
            };
        case CHANGE_TIME_SCREEN:
            return {
                ...state,
                timeMode: action.value
            };
        default:
            return state
    }
}