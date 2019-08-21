import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';

export interface IMonthTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IMonthTransactionState;
    actions?: IMonthTransactionAction;
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

}

export interface IMonthTransactionState {
    isInitialized?: boolean;
    income: Number;
    expense: Number;
    balance: Number;
    transactions: Array<ITransactionDataProp>;
    currentMonthStart: Moment;
    currentMonthEnd: Moment;
}
