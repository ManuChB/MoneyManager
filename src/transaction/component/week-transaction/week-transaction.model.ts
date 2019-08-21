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
    setWeekTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    changeWeek?: (start: Moment, end: Moment) => Action;
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
    updateWeekTransaction?: (transaction: ITransactionDataProp) => Action;
    setWeekTransactionToDetail?: (transaction: ITransactionDataProp, onSave: any, onRemove: any) => Action;
    removeTransaction?: (transaction: ITransactionDataProp) => Action;
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
