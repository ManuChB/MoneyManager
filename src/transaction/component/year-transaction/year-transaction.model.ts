import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IYearTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IYearTransactionState;
    actions?: IYearTransactionAction;
}

export interface IYearTransactionAction {
    yearTransactionInitializeStart?: () => Action;
    yearTransactionInitializeFinish?: () => Action;
}

export interface IYearTransactionState {
    isInitialized?: boolean;
}
