import { ACCOUNT_LIST_INITIALIZE_FINISH, ACCOUNT_LIST_INITIALIZE_START, SET_ACCOUNT_LIST, SET_ACCOUNT_TO_DETAIL, SAVE_NEW_ACCOUNT } from './account-list.constant';
import { IAccountListAction } from './account-list.model';

const accountListAction: IAccountListAction = {
    accountListInitializeStart() {
        console.log(`[account][action][initializeStart]`);
        return {
            type: ACCOUNT_LIST_INITIALIZE_START
        }
    },

    accountListInitializeFinish() {
        console.log(`[account][action][initializeFinish]`);
        return {
            type: ACCOUNT_LIST_INITIALIZE_FINISH
        }
    },

    setAccounts(accounts) {
        console.log(`[account][action][setAccounts]`);
        return {
            type: SET_ACCOUNT_LIST,
            value: accounts
        }
    },

    setAccountToDetail(account, onSave) {
        console.log(`[account][action][setAccountToDetail]`);
        return {
            type: SET_ACCOUNT_TO_DETAIL,
            value: {account, onSave}
        }
    },

    saveNewAccount(account) {
        console.log(`[account][action][saveNewAccount]`);
        return {
            type: SAVE_NEW_ACCOUNT,
            value: account
        }
    }

}

export default accountListAction;