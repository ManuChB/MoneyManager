import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';
import { ITransactionListState } from '../../transaction-list.model';

export interface IWeekTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IWeekTransactionState;
    actions?: IWeekTransactionAction;
    transactionListState?: ITransactionListState;
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
    weekTransSetUserCurrency?: (currency: any) => Action;
}
}

export interface IWeekTransactionState {
    isInitialized?: boolean;
    income: number;
    expense: number;
    balance: number;
    transactions: Array<ITransactionDataProp>;
    currentWeekStart: Moment;
    currentWeekEnd: Moment;
    userCurrency: any;
}
