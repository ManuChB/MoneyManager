import accountDetailConstant from './account-detail.constant';
import { IAccountDetailAction } from './account-detail.model';

const accountDetailAction: IAccountDetailAction = {
    accountDetailInitializeStart(initialState) {
        return {
            type: accountDetailConstant.ACCOUNT_DETAIL_INITIALIZE_START,
            value: initialState
        }
    },

    accountDetailInitializeFinish() {
        return {
            type: accountDetailConstant.ACCOUNT_DETAIL_INITIALIZE_FINISH
        }
    },

    accountDetailDataChange(account) {
        return {
            type: accountDetailConstant.ACCOUNT_DETAIL_DATA_CHANGE,
            value: account
        }
    },

    setPickersData(currencyList, accountTypeList) {
        return {
            type: accountDetailConstant.ACCOUNT_DETAIL_SET_PICKER_DATA,
            value: { currencyList, accountTypeList}
        }
    }


}

export default accountDetailAction;