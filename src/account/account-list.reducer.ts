import accountListConstants from './account-list.constant';
import { AnyAction } from 'redux';
import { IAccountListState } from './account-list.model';
import appConstans from '../appConstants';

export const initialState: IAccountListState = {
    isInitialized: false,
    accountList: [],
    accountsBalance: [{
        income: 0.00,
        expense: 0.00,
        balance: 0.00,
        type: appConstans.accountTypesGeneral.name
    }],
    accountListByType: [],
    userCurrency: null
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
                accountsBalance: action.value
            };
        case accountListConstants.REMOVE_ACCOUNT:
            return {
                ...state,
                accountList: state.accountList.filter(
                    (account) => account.id !== action.value.id
                )
            };
        case accountListConstants.SET_ACCOUNT_LIST_BY_TYPE:
            return {
                ...state,
                accountListByType: action.value
            };
        case accountListConstants.SET_USER_CURRENCY:
            return {
                ...state,
                userCurrency: action.value
            };
        default:
            return state
    }
}