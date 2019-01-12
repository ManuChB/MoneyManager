import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IWeekTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IWeekTransactionState;
    actions?: IWeekTransactionAction;
}

export interface IWeekTransactionAction {
    weekTransactionInitializeStart?: () => Action;
    weekTransactionInitializeFinish?: () => Action;
}

export interface IWeekTransactionState {
    isInitialized?: boolean;
    income: Number;
    expense: Number;
    balance: Number;
}
