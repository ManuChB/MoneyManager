import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';

export interface IWeekTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IWeekTransactionState;
    actions?: IWeekTransactionAction;
}

export interface IWeekTransactionAction {
    weekTransactionInitializeStart?: () => Action;
    weekTransactionInitializeFinish?: () => Action;
    weekTransactionNewTransaction?: (transaction: ITransactionDataProp) => Action;
    weekTransactionSetTransactionToDetail?: (transaction: ITransactionDataProp, onSave: any) => Action;

}

export interface IWeekTransactionState {
    isInitialized?: boolean;
    income: Number;
    expense: Number;
    balance: Number;
}
