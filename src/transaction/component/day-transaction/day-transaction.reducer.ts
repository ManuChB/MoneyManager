import { DAY_TRANSACTION_INITIALIZE_FINISH, DAY_TRANSACTION_INITIALIZE_START, CHANGE_DATE, SET_DAY_TRANSACTIONS, SAVE_NEW_TRANSACTION, SHOW_DETAIL_MODAL } from './day-transaction.constant';
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
    transactions: [],
    showDetailModal: false
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
            console.log(`[dayTransaction][reducer][CHANGE_DATE]`, action);
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
        case SAVE_NEW_TRANSACTION:
            console.log(`[dayTransaction][reducer][SAVE_NEW_TRANSACTION]`);
            return {
                ...state,
                transactions: state.transactions.push(action.value)
            };
        case SHOW_DETAIL_MODAL:
            console.log(`[dayTransaction][reducer][SHOW_DETAIL_MODAL]`);
            return {
                ...state,
                showDetailModal: action.value
            };
        default:
            return state
    }
}