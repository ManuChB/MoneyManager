import {
    WEEK_TRANSACTION_INITIALIZE_START, WEEK_TRANSACTION_INITIALIZE_FINISH
} from './week-transaction.constant';
import { AnyAction } from 'redux';
import { IWeekTransactionState } from './week-transaction.model';
import appConstants from '../../../appConstants';
import moment from 'moment';

export const initialState: IWeekTransactionState = {
    isInitialized: false,
    income: 0,
    expense: 0,
    balance: 0
};

export default function weekTransaction(state: IWeekTransactionState = initialState, action: AnyAction) {
    console.log(`[weekTransaction][reducer]`, action);

    switch (action.type) {
        case WEEK_TRANSACTION_INITIALIZE_START:
            console.log(`[weekTransaction][reducer][WEEK_TRANSACTION_INITIALIZE_START]`);
            return {
                ...state,
                isInitialized: false
            };
        case WEEK_TRANSACTION_INITIALIZE_FINISH:
            console.log(`[weekTransaction][reducer][WEEK_TRANSACTION_INITIALIZE_FINISH]`);
            return {
                ...state,
                isInitialized: true
            };

        default:
            return state
    }
}