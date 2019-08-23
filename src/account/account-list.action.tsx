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

    setAccountToDetail(account, onSave, onRemove) {
        return {
            type: accountListConstants.SET_ACCOUNT_TO_DETAIL,
            value: {account, onSave, onRemove}
        }
    },

    saveNewAccount(account) {
        return {
            type: accountListConstants.SAVE_NEW_ACCOUNT,
            value: account
        }
    },
    
    setBalanceInfo(accountsBalance) {
        return {
            type: accountListConstants.SET_ACCOUNTS_BALANCE_INFO,
            value: accountsBalance
        }
    },

    removeAccount(transaction) {
        return {
            type: accountListConstants.REMOVE_ACCOUNT,
            value: transaction
        }
    },

    setAccountsByType(accounts) {
        return {
            type: accountListConstants.SET_ACCOUNT_LIST_BY_TYPE,
            value: accounts
        }
    },
}

export default accountListAction;