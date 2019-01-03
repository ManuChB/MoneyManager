import { DAY_TRANSACTION_INITIALIZE_FINISH, DAY_TRANSACTION_INITIALIZE_START, CHANGE_DATE, SET_DAY_TRANSACTIONS } from './day-transaction.constant';
import { AnyAction } from 'redux';
import { IDayTransactionState } from './day-transaction.model';
import appConstans from '../../../appConstants';
import moment from 'moment';

export const initialState: IDayTransactionState = {
    isInitialized: false,
    date: moment().format('DD-MM-YYYY').toString(),
    income: 100.00,
    expense: 40.00,
    balance: 60.00,
    transactions: []
};

export default function dayTransaction(state: IDayTransactionState = initialState, action: AnyAction) {
    switch (action.type) {
        case DAY_TRANSACTION_INITIALIZE_FINISH:
            console.log(`[dayTransaction][reducer][DAY_TRANSACTION_INITIALIZE_FINISH]`);
            return {
                ...state,
                isInitialized: false
            };
        case DAY_TRANSACTION_INITIALIZE_START:
            console.log(`[dayTransaction][reducer][DAY_TRANSACTION_INITIALIZE_START]`);
            return {
                ...state,
                isInitialized: true
            };
        case CHANGE_DATE:
            console.log(`[dayTransaction][reducer][CHANGE_DATE]`);
            return {
                ...state,
                date: action.value
            };
        case SET_DAY_TRANSACTIONS:
            console.log(`[dayTransaction][reducer][SET_DAY_TRANSACTIONS]`);
            return {
                ...state,
                transactions: action.value
            };
        default:
            return state
    }
}