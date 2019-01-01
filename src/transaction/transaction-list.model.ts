import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface ITransactionListProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ITransactionListState;
    actions?: ITransactionListAction;
}

export interface ITransactionListAction {
    transactionListInitializeStart?: () => Action;
    transactionListInitializeFinish?: () => Action;
    changeTimeFormat?: (mode: string) => Action;
}

export interface ITransactionListState {
    isInitialized?: boolean;
    timeMode?: string;
}
