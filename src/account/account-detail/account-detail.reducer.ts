import { ACCOUNT_DETAIL_INITIALIZE_START, ACCOUNT_DETAIL_INITIALIZE_FINISH, 
    ACCOUNT_DETAIL_DATA_CHANGE, ACCOUNT_DETAIL_SET_PICKER_DATA } from './account-detail.constant';
import { AnyAction } from 'redux';
import { IAccountDetailState } from './account-detail.model';

export const initialState: IAccountDetailState = {
    isInitialized: false,
    account: {},
    onClose: null,
    onSave: null,
    currencyList: [],
    accountTypeList: []
};

export default function accountDetail(state: IAccountDetailState = initialState, action: AnyAction) {
    switch (action.type) {
        case ACCOUNT_DETAIL_INITIALIZE_START:
            console.log(`[accountDetail][reducer][ACCOUNT_DETAIL_INITIALIZE_START]`, action);
            return {
                ...state,
                isInitialized: false,
                account: action.value.account,
                onClose: action.value.onClose,
                onSave: action.value.onSave
            };
        case ACCOUNT_DETAIL_INITIALIZE_FINISH:
            console.log(`[accountDetail][reducer][ACCOUNT_DETAIL_INITIALIZE_FINISH]`);
            return {
                ...state,
                isInitialized: true
            };
        case ACCOUNT_DETAIL_DATA_CHANGE:
            console.log(`[accountDetail][reducer][ACCOUNT_DETAIL_DATA_CHANGE]`);
            return {
                ...state,
                account: action.value
            };
        case ACCOUNT_DETAIL_SET_PICKER_DATA:
            console.log(`[accountDetail][reducer][ACCOUNT_DETAIL_SET_PICKER_DATA]`);
            return {
                ...state,
                currencyList: action.value.currencyList,
                accountTypeList: action.value.accountTypeList
            };
        default:
            return state
    }
}