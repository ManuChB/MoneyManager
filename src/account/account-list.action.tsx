import { ACCOUNT_LIST_INITIALIZE_FINISH, ACCOUNT_LIST_INITIALIZE_START, SET_ACCOUNT_LIST, SET_ACCOUNT_TO_DETAIL, SAVE_NEW_ACCOUNT,
    SET_ACCOUNTS_BALANCE_INFO } from './account-list.constant';
import { IAccountListAction } from './account-list.model';

const accountListAction: IAccountListAction = {
    accountListInitializeStart() {
        return {
            type: ACCOUNT_LIST_INITIALIZE_START
        }
    },

    accountListInitializeFinish() {
        return {
            type: ACCOUNT_LIST_INITIALIZE_FINISH
        }
    },

    setAccounts(accounts) {
        return {
            type: SET_ACCOUNT_LIST,
            value: accounts
        }
    },

    setAccountToDetail(account, onSave) {
        console.log('---------detail');
        return {
            type: SET_ACCOUNT_TO_DETAIL,
            value: {account, onSave}
        }
    },

    saveNewAccount(account) {
        return {
            type: SAVE_NEW_ACCOUNT,
            value: account
        }
    },
    
    setBalanceInfo(income, expense, balance) {
        return {
            type: SET_ACCOUNTS_BALANCE_INFO,
            value: { income, expense, balance }
        }
    },


}

export default accountListAction;