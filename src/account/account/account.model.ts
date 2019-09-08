import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IAccountProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IAccountState;
    actions?: IAccountAction;
}

export interface IAccountAction {

}

export interface IAccountState {
    isInitialized?: boolean;
    account?: IAccountProp;
}

export interface IAccountProp {
    data: IAccountData;
    onPress: () => void;

}

export interface IAccountData {
    id?: string;
    name?: string;
    value?: number;
    description?: string;
    type?: {id: string, name: string, iconName: string};
    currency?: { id: string, name: string, nameWithSymbol: string };
}
