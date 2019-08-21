import accountListConstants from './account-list.constant';
import { IAccountListAction } from './account-list.model';

const accountListAction: IAccountListAction = {
    accountListInitializeStart() {
        return {
            type: accountListConstants.ACCOUNT_LIST_INITIALIZE_START
        }
    },

    accountListInitializeFinish() {
        return {
            type: accountListConstants.ACCOUNT_LIST_INITIALIZE_FINISH
        }
    },

    setAccounts(accounts) {
        return {
            type: accountListConstants.SET_ACCOUNT_LIST,
            value: accounts
        }
    },

    setAccountToDetail(account, onSave) {
        return {
            type: accountListConstants.SET_ACCOUNT_TO_DETAIL,
            value: {account, onSave}
        }
    },

    saveNewAccount(account) {
        return {
            type: accountListConstants.SAVE_NEW_ACCOUNT,
            value: account
        }
    },
    
    setBalanceInfo(income, expense, balance) {
        return {
            type: accountListConstants.SET_ACCOUNTS_BALANCE_INFO,
            value: { income, expense, balance }
        }
    }
}

export default accountListAction;