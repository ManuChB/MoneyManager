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
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
    removeAccount?: (account: IAccountData) => Action;
}

export interface IAccountListState {
    isInitialized?: boolean;
    accountList?: Array<IAccountData>;
    accountToDetail?: IAccountData;
    income: Number;
    expense: Number;
    balance: Number;
}
