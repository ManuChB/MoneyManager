import { ACCOUNT_DETAIL_INITIALIZE_START, ACCOUNT_DETAIL_INITIALIZE_FINISH, ACCOUNT_DETAIL_DATA_CHANGE } from './account-detail.constant';
import { AnyAction } from 'redux';
import { IAccountDetailState } from './account-detail.model';

export const initialState: IAccountDetailState = {
    isInitialized: false,
    account: {},
    onClose: null,
    onSave: null
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
        default:
            return state
    }
}