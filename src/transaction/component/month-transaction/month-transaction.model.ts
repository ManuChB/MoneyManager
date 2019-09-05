import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';
import { ITransactionListState, ITransactionListAction } from '../../transaction-list.model';

export interface IMonthTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IMonthTransactionState;
    actions?: IMonthTransactionAction & ITransactionListAction;
    transactionListState?: ITransactionListState;
}

export interface IMonthTransactionAction {
    monthTransactionInitializeStart?: () => Action;
    monthTransactionInitializeFinish?: () => Action;
    setMonthTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    changeMonth?: (start: Moment, end: Moment) => Action;
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
    monthTransSetUserCurrency?: (currency: any) => Action;
}

export interface IMonthTransactionState {
    isInitialized?: boolean;
    income: number;
    expense: number;
    balance: number;
    transactions: Array<ITransactionDataProp>;
    currentMonthStart: Moment;
    currentMonthEnd: Moment;
    userCurrency: any;
}
