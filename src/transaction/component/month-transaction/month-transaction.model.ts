import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';
import { ITransactionListState } from '../../transaction-list.model';

export interface IMonthTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IMonthTransactionState;
    actions?: IMonthTransactionAction;
    transactionListState?: ITransactionListState;
}

export interface IMonthTransactionAction {
    monthTransactionInitializeStart?: () => Action;
    monthTransactionInitializeFinish?: () => Action;
    monthTransactionNewTransaction?: (transaction: ITransactionDataProp, monthStart: Moment, monthEnd: Moment) => Action;
    setMonthTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    changeMonth?: (start: Moment, end: Moment) => Action;
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
    updateMonthTransaction?: (transaction: ITransactionDataProp) => Action;
    setMonthTransactionToDetail?: (transaction: ITransactionDataProp, onSave: any, onRemove: any) => Action;
    removeTransaction?: (transaction: ITransactionDataProp) => Action;
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
