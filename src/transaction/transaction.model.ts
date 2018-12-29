import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface ITransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ITransactionState;
    actions?: ITransactionAction;
}

export interface ITransactionAction {
    transactionInitializeStart?: () => Action;
    transactionInitializeFinish?: () => Action;
    changeTimeFormat?: (mode: string) => Action;
}

export interface ITransactionState {
    isInitialized?: boolean;
    timeMode?: string;
}
