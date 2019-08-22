import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { IAccountData } from '../account/account.model';

export interface IAccountDetailProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IAccountDetailState;
    actions?: IAccountDetailAction;
}

export interface IAccountDetailAction {
    accountDetailInitializeStart?: (initialState: IAccountDetailState) => Action;
    accountDetailInitializeFinish?: () => Action;
    accountDetailDataChange?: (account: IAccountData) => Action;
    setPickersData?: (currencyList: Array<{ id: number, name: string }>, accountTypeList: Array<{ id: number, name: string }>) => Action;

}

export interface IAccountDetailState {
    isInitialized?: boolean;
    account?: IAccountData;
    onClose: () => void;
    onSave: (data: IAccountData) => void;
    onRemove: (data: IAccountData) => void;
    currencyList?: Array<{id: number, name: string}>;
    accountTypeList?: Array<{ id: number, name: string }>;

}
