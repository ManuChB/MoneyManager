import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';
import { ITransactionListState, ITransactionListAction } from '../../transaction-list.model';

export interface IDayTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IDayTransactionState;
    actions?: IDayTransactionAction & ITransactionListAction;
    transactionListState?: ITransactionListState;
}

export interface IDayTransactionAction {
    dayTransactionInitializeStart?: () => Action;
    dayTransactionInitializeFinish?: () => Action;
    changeDay?: (newDate: Moment) => Action;
    setDayTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
    dayTransSetUserCurrency?: (currency: any) => Action;
}

export interface IDayTransactionState {
    isInitialized?: boolean;
    date?: Moment;
    income: number;
    expense: number;
    balance: number;
    transactions: Array<ITransactionDataProp>;
    userCurrency: any;
}
