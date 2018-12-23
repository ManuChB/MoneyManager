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
}
