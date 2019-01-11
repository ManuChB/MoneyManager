import { ACCOUNT_LIST_INITIALIZE_START, ACCOUNT_LIST_INITIALIZE_FINISH, SET_ACCOUNT_LIST, SET_ACCOUNT_TO_DETAIL } from './account-list.constant';
import { AnyAction } from 'redux';
import { IAccountListState } from './account-list.model';

export const initialState: IAccountListState = {
    isInitialized: false,
    accountList: []
};

export default function accountList(state: IAccountListState = initialState, action: AnyAction) {
    switch (action.type) {
        case ACCOUNT_LIST_INITIALIZE_START:
            console.log(`[moneyManager][reducer][ACCOUNT_LIST_INITIALIZE_START]`);
            return {
                ...state,
                isInitialized: false
            };
        case ACCOUNT_LIST_INITIALIZE_FINISH:
            console.log(`[moneyManager][reducer][ACCOUNT_LIST_INITIALIZE_FINISH]`);
            return {
                ...state,
                isInitialized: true
            };
        case SET_ACCOUNT_LIST:
            console.log(`[moneyManager][reducer][SET_ACCOUNT_LIST]`);
            return {
                ...state,
                accountList: action.value
            };
        default:
            return state
    }
}