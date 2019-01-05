import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';

export interface IDayTransactionProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IDayTransactionState;
    actions?: IDayTransactionAction;
}

export interface IDayTransactionAction {
    dayTransactionInitializeStart?: () => Action;
    dayTransactionInitializeFinish?: () => Action;
    changeDay?: (newDate: string) => Action;
    setDayTransactions?: (transactions: Array<ITransactionDataProp>) => Action;
    saveNewTransaction?: (transaction: ITransactionDataProp) => Action;
    showDetailModal?: (showModal: boolean) => Action;
    updateTransaction?: (transaction: ITransactionDataProp) => Action;
    setTransactionToDetail?: (transaction: ITransactionDataProp) => Action;
}

export interface IDayTransactionState {
    isInitialized?: boolean;
    date?: string;
    income: Number;
    expense: Number;
    balance: Number;
    transactions: Array<ITransactionDataProp>;
    showDetailModal?: boolean;
    transactionToDetail?: ITransactionDataProp;

}
