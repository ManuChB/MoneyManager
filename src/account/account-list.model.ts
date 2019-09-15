import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { IAccountData } from './account/account.model';
import { IMoneyManagerAction } from '../money-manager/money-manager.model';

export interface IAccountListProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IAccountListState;
    actions?: IAccountListAction & IMoneyManagerAction;
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
    setUserCurrency?: (currency: any) => Action;

}

export interface IAccountListState {
    isInitialized?: boolean;
    accountList?: Array<IAccountData>;
    accountToDetail?: IAccountData;
    accountsBalance?: Array<IBalanceInfo>;
    accountListByType?: Array<IAccountListByType>;
    userCurrency?: any;

}
export interface IBalanceInfo{
        income: number,
        expense: number,
        balance: number,
        type: string
    }

export interface IAccountListByType { 
    type: { name: string, id: string }, 
    data: Array<IAccountData>
}
