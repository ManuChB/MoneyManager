import {
    WEEK_TRANSACTION_INITIALIZE_START, WEEK_TRANSACTION_INITIALIZE_FINISH, CHANGE_WEEK, SET_WEEK_TRANSACTIONS, SET_WEEK_BALANCE_INFO,
    SET_WEEK_TRANSACTION_TO_DETAIL, UPDATE_WEEK_TRANSACTION
} from './week-transaction.constant';
import { AnyAction } from 'redux';
import { IWeekTransactionState } from './week-transaction.model';
import appConstants from '../../../appConstants';
import moment from 'moment';

export const initialState: IWeekTransactionState = {
    isInitialized: false,
    income: 0,
    expense: 0,
    balance: 0,
    transactions: [],
    currentWeekStart: null,
    currentWeekEnd: null
};

export default function weekTransaction(state: IWeekTransactionState = initialState, action: AnyAction) {

    switch (action.type) {
        case WEEK_TRANSACTION_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case WEEK_TRANSACTION_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case CHANGE_WEEK:
            return {
                ...state,
                currentWeekStart: action.value.weekStart,
                currentWeekEnd: action.value.weekEnd,
                isInitialized: false
            };
        case SET_WEEK_TRANSACTIONS:
            return {
                ...state,
                transactions: action.value,
                isInitialized: true
            };
        case SET_WEEK_BALANCE_INFO:
            return {
                ...state,
                income: action.value.income,
                expense: action.value.expense,
                balance: action.value.balance,
                isInitialized: true
            };
        case UPDATE_WEEK_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map(
                    (transaction) => transaction.id === action.value.id ? action.value : transaction
                )
            };
        case SET_WEEK_TRANSACTION_TO_DETAIL:
            return {
                ...state,
                transactionToDetail: action.value.transaction
            };
        default:
            return state
    }
}