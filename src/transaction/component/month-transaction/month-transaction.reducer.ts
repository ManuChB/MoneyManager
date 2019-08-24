import monthTransConstants from './month-transaction.constant';
import { AnyAction } from 'redux';
import { IMonthTransactionState } from './month-transaction.model';


export const initialState: IMonthTransactionState = {
    isInitialized: false,
    income: 0,
    expense: 0,
    balance: 0,
    transactions: [],
    currentMonthStart: null,
    currentMonthEnd: null,
    userCurrency: null
};

export default function monthTransaction(state: IMonthTransactionState = initialState, action: AnyAction) {

    switch (action.type) {
        case monthTransConstants.MONTH_TRANSACTION_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case monthTransConstants.MONTH_TRANSACTION_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case monthTransConstants.CHANGE_MONTH:
            return {
                ...state,
                currentMonthStart: action.value.monthStart,
                currentMonthEnd: action.value.monthEnd,
                isInitialized: false
            };
        case monthTransConstants.SET_MONTH_TRANSACTIONS:
            return {
                ...state,
                transactions: action.value,
                isInitialized: true
            };
        case monthTransConstants.SET_MONTH_BALANCE_INFO:
            return {
                ...state,
                income: action.value.income,
                expense: action.value.expense,
                balance: action.value.balance,
                isInitialized: true
            };
        case monthTransConstants.UPDATE_MONTH_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map(
                    (transaction) => transaction.id === action.value.id ? action.value : transaction
                )
            };
        case monthTransConstants.SET_MONTH_TRANSACTION_TO_DETAIL:
            return {
                ...state,
                transactionToDetail: action.value.transaction
            };
        case monthTransConstants.MONTH_TRANSACTION_REMOVE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.value.id
                )
            };
        case monthTransConstants.MONTH_TRANSACTION_SET_USER_CURRENCY:
            return {
                ...state,
                userCurrency: action.value
            };  
        default:
            return state
    }
}