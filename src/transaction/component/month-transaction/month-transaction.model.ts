import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IMonthTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IMonthTransactionState;
    actions?: IMonthTransactionAction;
}

export interface IMonthTransactionAction {
    monthTransactionInitializeStart?: () => Action;
    monthTransactionInitializeFinish?: () => Action;
}

export interface IMonthTransactionState {
    isInitialized?: boolean;
}
