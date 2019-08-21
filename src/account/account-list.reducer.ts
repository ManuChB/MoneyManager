import accountListConstants from './account-list.constant';
import { AnyAction } from 'redux';
import { IAccountListState } from './account-list.model';

export const initialState: IAccountListState = {
    isInitialized: false,
    accountList: [],
    income: 0.00,
    expense: 0.00,
    balance: 0.00
};

export default function accountList(state: IAccountListState = initialState, action: AnyAction) {
    switch (action.type) {
        case accountListConstants.ACCOUNT_LIST_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case accountListConstants.ACCOUNT_LIST_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case accountListConstants.SET_ACCOUNT_LIST:
            return {
                ...state,
                accountList: action.value
            };
        case accountListConstants.SET_ACCOUNTS_BALANCE_INFO:
            return {
                ...state,
                income: action.value.income,
                expense: action.value.expense,
                balance: action.value.balance,
            };
        default:
            return state
    }
}