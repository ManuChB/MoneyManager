import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';
import { ITransactionListState } from '../../transaction-list.model';

export interface IDayTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IDayTransactionState;
    actions?: IDayTransactionAction;
    transactionListState?: ITransactionListState;
}

export interface IDayTransactionAction {
    dayTransactionInitializeStart?: () => Action;
    dayTransactionInitializeFinish?: () => Action;
    changeDay?: (newDate: Moment) => Action;
    setDayTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    saveNewTransaction?: (transaction: ITransactionDataProp) => Action;
    updateTransaction?: (transaction: ITransactionDataProp) => Action;
    setTransactionToDetail?: (transaction: ITransactionDataProp, onSave: any, onRemove: any) => Action;
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
    removeTransaction?: (transaction: ITransactionDataProp) => Action;
    dayTransSetUserCurrency?: (currency: any) => Action;
}

export interface IDayTransactionState {
    isInitialized?: boolean;
    date?: Moment;
    income: number;
    expense: number;
    balance: number;
    transactions: Array<ITransactionDataProp>;
    transactionToDetail?: ITransactionDataProp;
    userCurrency: any;
}
