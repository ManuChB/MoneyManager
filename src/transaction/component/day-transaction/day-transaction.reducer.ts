import dayTransactionsConstants from './day-transaction.constant';
import { AnyAction } from 'redux';
import { IDayTransactionState } from './day-transaction.model';
import appConstants from '../../../appConstants';
import moment from 'moment';

export const initialState: IDayTransactionState = {
    isInitialized: false,
    date: moment(),
    income: 0.00,
    expense: 0.00,
    balance: 0.00,
    transactions: [],
    showDetailModal: false,
    transactionToDetail: null,
    userCurrency: null
};

export default function dayTransaction(state: IDayTransactionState = initialState, action: AnyAction) {

    switch (action.type) {
        case dayTransactionsConstants.DAY_TRANSACTION_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case dayTransactionsConstants.DAY_TRANSACTION_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case dayTransactionsConstants.CHANGE_DATE:
            return {
                ...state,
                date: action.value
            };
        case dayTransactionsConstants.SET_DAY_TRANSACTIONS:
            return {
                ...state,
                transactions: action.value
            };
        case dayTransactionsConstants.SHOW_DETAIL_MODAL:
            return {
                ...state,
                showDetailModal: action.value

            };
        case dayTransactionsConstants.UPDATE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map(
                    (transaction) => transaction.id === action.value.id ? action.value : transaction
                )
            };
        case dayTransactionsConstants.SET_TRANSACTION_TO_DETAIL:
            return {
                ...state,
                transactionToDetail: action.value.transaction
            };
        case dayTransactionsConstants.SET_BALANCE_INFO:
            return {
                ...state,
                income: action.value.income,
                expense: action.value.expense,
                balance: action.value.balance,
            };
        case dayTransactionsConstants.REMOVE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.value.id
                )
            };     
        case dayTransactionsConstants.DAY_TRANSACTION_SET_USER_CURRENCY:
            return {
                ...state,
                userCurrency: action.value
            };     
        default:
            return state
    }
}