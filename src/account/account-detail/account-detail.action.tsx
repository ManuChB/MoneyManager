import { ACCOUNT_DETAIL_INITIALIZE_FINISH, ACCOUNT_DETAIL_INITIALIZE_START, 
    ACCOUNT_DETAIL_DATA_CHANGE, ACCOUNT_DETAIL_SET_PICKER_DATA } from './account-detail.constant';
import { IAccountDetailAction } from './account-detail.model';

const accountDetailAction: IAccountDetailAction = {
    accountDetailInitializeStart(initialState) {
        console.log(`[accountDetail][action][initializeStart]`);
        return {
            type: ACCOUNT_DETAIL_INITIALIZE_START,
            value: initialState
        }
    },

    accountDetailInitializeFinish() {
        console.log(`[accountDetail][action][initializeFinish]`);
        return {
            type: ACCOUNT_DETAIL_INITIALIZE_FINISH
        }
    },

    accountDetailDataChange(account) {
        console.log(`[accountDetail][action][accountDetailDataChange]`);
        return {
            type: ACCOUNT_DETAIL_DATA_CHANGE,
            value: account
        }
    },

    setPickersData(currencyList, accountTypeList) {
        console.log(`[accountDetail][action][setCurrencyList]`);
        return {
            type: ACCOUNT_DETAIL_SET_PICKER_DATA,
            value: { currencyList, accountTypeList}
        }
    }


}

export default accountDetailAction;