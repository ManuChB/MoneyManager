import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';

export interface IWeekTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IWeekTransactionState;
    actions?: IWeekTransactionAction;
}

export interface IWeekTransactionAction {
    weekTransactionInitializeStart?: () => Action;
    weekTransactionInitializeFinish?: () => Action;
    weekTransactionNewTransaction?: (transaction: ITransactionDataProp, weekStart: Moment, WeekEnd: Moment) => Action;
    weekTransactionSetTransactionToDetail?: (transaction: ITransactionDataProp, onSave: any) => Action;
    setWeekTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    changeWeek?: (start: Moment, end: Moment) => Action;
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
}

export interface IWeekTransactionState {
    isInitialized?: boolean;
    income: Number;
    expense: Number;
    balance: Number;
    transactions: Array<ITransactionDataProp>;
    currentWeekStart: Moment;
    currentWeekEnd: Moment;
}
