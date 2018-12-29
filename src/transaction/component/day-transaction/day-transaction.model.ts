import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IDayTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IDayTransactionState;
    actions?: IDayTransactionAction;
}

export interface IDayTransactionAction {
    dayTransactionInitializeStart?: () => Action;
    dayTransactionInitializeFinish?: () => Action;
}

export interface IDayTransactionState {
    isInitialized?: boolean;
}
