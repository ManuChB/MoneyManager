import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { Moment } from 'moment';

export interface IDayTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IDayTransactionState;
    actions?: IDayTransactionAction;
}

export interface IDayTransactionAction {
    dayTransactionInitializeStart?: () => Action;
    dayTransactionInitializeFinish?: () => Action;
    changeDay?: (newDate: Moment) => Action;
    setDayTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    saveNewTransaction?: (transaction: ITransactionDataProp) => Action;
    showDetailModal?: (showModal: boolean) => Action;
    updateTransaction?: (transaction: ITransactionDataProp) => Action;
    setTransactionToDetail?: (transaction: ITransactionDataProp, onSave: any, onRemove: any) => Action;
    setBalanceInfo?: (income: number, expense: number, balance: number) => Action;
    longPress?: (transaction: ITransactionDataProp) => Action;
    removeTransaction?: (transaction: ITransactionDataProp) => Action;
}

export interface IDayTransactionState {
    isInitialized?: boolean;
    date?: Moment;
    income: Number;
    expense: Number;
    balance: Number;
    transactions: Array<ITransactionDataProp>;
    showDetailModal?: boolean;
    transactionToDetail?: ITransactionDataProp;
}
