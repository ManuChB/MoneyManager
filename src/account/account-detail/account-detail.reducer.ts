import accountDetailConstant from './account-detail.constant';
import { AnyAction } from 'redux';
import { IAccountDetailState } from './account-detail.model';

export const initialState: IAccountDetailState = {
    isInitialized: false,
    account: {},
    onClose: null,
    onSave: null,
    onRemove: null,
    currencyList: [],
    accountTypeList: []
};

export default function accountDetail(state: IAccountDetailState = initialState, action: AnyAction) {
    switch (action.type) {
        case accountDetailConstant.ACCOUNT_DETAIL_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false,
                account: action.value.account,
                onClose: action.value.onClose,
                onSave: action.value.onSave,
                onRemove: action.value.onRemove
            };
        case accountDetailConstant.ACCOUNT_DETAIL_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case accountDetailConstant.ACCOUNT_DETAIL_DATA_CHANGE:
            return {
                ...state,
                account: action.value
            };
        case accountDetailConstant.ACCOUNT_DETAIL_SET_PICKER_DATA:
            return {
                ...state,
                currencyList: action.value.currencyList,
                accountTypeList: action.value.accountTypeList
            };
        default:
            return state
    }
}