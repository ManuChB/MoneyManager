import { ACCOUNT_DETAIL_INITIALIZE_FINISH, ACCOUNT_DETAIL_INITIALIZE_START, 
    ACCOUNT_DETAIL_DATA_CHANGE, ACCOUNT_DETAIL_SET_PICKER_DATA } from './account-detail.constant';
import { IAccountDetailAction } from './account-detail.model';

const accountDetailAction: IAccountDetailAction = {
    accountDetailInitializeStart(initialState) {
        return {
            type: ACCOUNT_DETAIL_INITIALIZE_START,
            value: initialState
        }
    },

    accountDetailInitializeFinish() {
        return {
            type: ACCOUNT_DETAIL_INITIALIZE_FINISH
        }
    },

    accountDetailDataChange(account) {
        return {
            type: ACCOUNT_DETAIL_DATA_CHANGE,
            value: account
        }
    },

    setPickersData(currencyList, accountTypeList) {
        return {
            type: ACCOUNT_DETAIL_SET_PICKER_DATA,
            value: { currencyList, accountTypeList}
        }
    }


}

export default accountDetailAction;