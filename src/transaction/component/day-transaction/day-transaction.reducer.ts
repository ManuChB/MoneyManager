import { DAY_TRANSACTION_INITIALIZE_FINISH, DAY_TRANSACTION_INITIALIZE_START, 
    CHANGE_DATE, SET_DAY_TRANSACTIONS, SAVE_NEW_TRANSACTION, 
    SHOW_DETAIL_MODAL, UPDATE_TRANSACTION, SET_TRANSACTION_TO_DETAIL, 
    SET_BALANCE_INFO, REMOVE_TRANSACTION } from './day-transaction.constant';
import { AnyAction } from 'redux';
import { IDayTransactionState } from './day-transaction.model';
import appConstans from '../../../appConstants';
import moment from 'moment';

export const initialState: IDayTransactionState = {
    isInitialized: false,
    date: moment(),
    income: 100.00,
    expense: 40.00,
    balance: 60.00,
    transactions: [],
    showDetailModal: false,
    transactionToDetail: null
};

export default function dayTransaction(state: IDayTransactionState = initialState, action: AnyAction) {
    console.log(`[dayTransaction][reducer]`, action);

    switch (action.type) {
        case DAY_TRANSACTION_INITIALIZE_FINISH:
            console.log(`[dayTransaction][reducer][DAY_TRANSACTION_INITIALIZE_FINISH]`);
            return {
                ...state,
                isInitialized: true
            };
        case DAY_TRANSACTION_INITIALIZE_START:
            console.log(`[dayTransaction][reducer][DAY_TRANSACTION_INITIALIZE_START]`);
            return {
                ...state,
                isInitialized: false
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
        case SHOW_DETAIL_MODAL:
            console.log(`[dayTransaction][reducer][SHOW_DETAIL_MODAL]`);
            return {
                ...state,
                showDetailModal: action.value

            };
        case UPDATE_TRANSACTION:
            console.log(`[dayTransaction][reducer][UPDATE_TRANSACTION]`);
            return {
                ...state,
                transactions: state.transactions.map(
                    (transaction) => transaction.id === action.value.id ? action.value : transaction
                )
            };
        case SET_TRANSACTION_TO_DETAIL:
            console.log(`[dayTransaction][reducer][SET_TRANSACTION_TO_DETAIL]`);
            return {
                ...state,
                transactionToDetail: action.value.transaction
            };
        case SET_BALANCE_INFO:
            console.log(`[dayTransaction][reducer][SET_BALANCE_INFO]`);
            return {
                ...state,
                income: action.value.income,
                expense: action.value.expense,
                balance: action.value.balance,
            };
        case REMOVE_TRANSACTION:
            console.log(`[dayTransaction][reducer][REMOVE_TRANSACTION]`, action);
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.value.id
                )
            };
        default:
            return state
    }
}