import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from './component/transaction/transaction.component';
import { IMoneyManagerAction } from '../money-manager/money-manager.model';

export interface ITransactionListProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ITransactionListState;
    actions?: ITransactionListAction & IMoneyManagerAction;
}

export interface ITransactionListAction {
    transactionListInitializeStart?: () => Action;
    transactionListInitializeFinish?: () => Action;
    changeTimeFormat?: (mode: string) => Action;
    activateDeleteMode?: () => Action;
    desactivateDeleteMode?: () => Action;
    addTransactionToDeleteList?: (transaction: ITransactionDataProp) => Action;
    removeTransactionFromDeleteList?: (transaction: ITransactionDataProp) => Action;
    setTransactionsByCategory?: (transactinList: any) => Action;
    setTransactionToDetail?: (transaction: ITransactionDataProp, getTransactions: any) => Action;
}

export interface ITransactionListState {
    isInitialized?: boolean;
    timeMode?: string;
    deleteMode?: boolean;
    toDeleteList?: Array<ITransactionDataProp>;
    transactionsByCategory?: any;
}
