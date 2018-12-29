import { TRANSACTION_INITIALIZE_FINISH, TRANSACTION_INITIALIZE_START, CHANGE_TIME_SCREEN } from './transaction.constant';
import { AnyAction } from 'redux';
import { ITransactionState } from './transaction.model';
import appConstans from '../appConstants';

export const initialState: ITransactionState = {
    isInitialized: false,
    timeMode: appConstans.timeMode.day
};

export default function transaction(state: ITransactionState = initialState, action: AnyAction) {
    switch (action.type) {
        case TRANSACTION_INITIALIZE_FINISH:
            console.log(`[transaction][reducer][TRANSACTION_INITIALIZE_FINISH]`);
            return {
                ...state,
                isInitialized: false
            };
        case TRANSACTION_INITIALIZE_START:
            console.log(`[transaction][reducer][TRANSACTION_INITIALIZE_START]`);
            return {
                ...state,
                isInitialized: true
            };
        case CHANGE_TIME_SCREEN:
            console.log(`[transaction][reducer][CHANGE_TIME_SCREEN]`);
            return {
                ...state,
                timeMode: action.value
            };
        default:
            console.log(`[transaction][reducer][default]`, state);

            return state
    }
}