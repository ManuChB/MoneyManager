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
}

export interface IAccountDetailState {
    isInitialized?: boolean;
    account?: IAccountData;
    onClose: () => void;
    onSave: (data: IAccountData) => void;
}
