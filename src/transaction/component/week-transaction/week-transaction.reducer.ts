import weekTransactionConstants from './week-transaction.constant';
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
    currentWeekEnd: null,
    userCurrency: null
};

export default function weekTransaction(state: IWeekTransactionState = initialState, action: AnyAction) {

    switch (action.type) {
        case weekTransactionConstants.WEEK_TRANSACTION_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case weekTransactionConstants.WEEK_TRANSACTION_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case weekTransactionConstants.CHANGE_WEEK:
            return {
                ...state,
                currentWeekStart: action.value.weekStart,
                currentWeekEnd: action.value.weekEnd,
                isInitialized: false
            };
        case weekTransactionConstants.SET_WEEK_TRANSACTIONS:
            return {
                ...state,
                transactions: action.value,
                isInitialized: true
            };
        case weekTransactionConstants.SET_WEEK_BALANCE_INFO:
            return {
                ...state,
                income: action.value.income,
                expense: action.value.expense,
                balance: action.value.balance,
                isInitialized: true
            };
        case weekTransactionConstants.UPDATE_WEEK_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map(
                    (transaction) => transaction.id === action.value.id ? action.value : transaction
                )
            };
        case weekTransactionConstants.SET_WEEK_TRANSACTION_TO_DETAIL:
            return {
                ...state,
                transactionToDetail: action.value.transaction
            };
        case weekTransactionConstants.WEEK_TRANSACTION_REMOVE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.value.id
                )
            };
        case weekTransactionConstants.WEEK_TRANSACTION_SET_USER_CURRENCY:
            return {
                ...state,
                userCurrency: action.value
            };
        default:
            return state
    }
}