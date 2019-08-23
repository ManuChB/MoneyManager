import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { IAccountData } from './account/account.model';

export interface IAccountListProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IAccountListState;
    actions?: IAccountListAction;
}

export interface IAccountListAction {
    accountListInitializeStart?: () => Action;
    accountListInitializeFinish?: () => Action;
    setAccounts?: (accounts: Array<IAccountData>) => Action;
    setAccountToDetail?: (account: IAccountData, onSave: any, onRemove: any) => Action;
    saveNewAccount?: (account: IAccountData) => Action;
    setBalanceInfo?: (accountsBalance: Array<IBalanceInfo>) => Action;
    removeAccount?: (account: IAccountData) => Action;
    setAccountsByType?: (accountListByOrderType: Array<IAccountListByType>) => Action;
}

export interface IAccountListState {
    isInitialized?: boolean;
    accountList?: Array<IAccountData>;
    accountToDetail?: IAccountData;
    accountsBalance?: Array<IBalanceInfo>;
    accountListByType?: Array<IAccountListByType>;

}
export interface IBalanceInfo{
        income: Number,
        expense: Number,
        balance: Number,
        type: string
    }

export interface IAccountListByType { 
    type: { name: string, id: string }, 
    data: Array<IAccountData>
}
