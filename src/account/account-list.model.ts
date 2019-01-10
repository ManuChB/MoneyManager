import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IAccountListProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IAccountListState;
    actions?: IAccountListAction;
}

export interface IAccountListAction {

}

export interface IAccountListState {
    isInitialized?: boolean;
}
