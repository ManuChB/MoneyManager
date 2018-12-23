import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface ITransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ITransactionState;
    actions?: ITransactionAction;
}

export interface ITransactionAction {

}

export interface ITransactionState {
    isInitialized?: boolean;
}
