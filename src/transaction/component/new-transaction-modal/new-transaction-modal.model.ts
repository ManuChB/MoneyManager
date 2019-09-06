import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';
import { IAccountData } from '../../../account/account/account.model';
import { IMoneyManagerAction } from '../../../money-manager/money-manager.model';

export interface ITransactionDetailProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ITransactionDetailState;
    actions?: ITransactionDetailAction & IMoneyManagerAction;
}

export interface ITransactionDetailAction {
    newTransactionInitializeStart?: (initialState: ITransactionDetailState) => Action;
    newTransactionInitializeFinish?: () => Action;
    changeData?: (data: ITransactionDataProp) => Action;
    setCategories?: (categories: Array<any>) => Action;
    setAccounts?: (accounts: Array<any>) => Action;
    setIcons?: (icons: Array<any>) => Action;

}

export interface ITransactionDetailState {
    isInitialized?: boolean;
    data: ITransactionDataProp;
    onClose: () => void;
    onSave: (data: ITransactionDataProp) => void;
    categories?: Array<any>;
    accounts?: Array<IAccountData>;
    icons?: Array<any>;
    onRemove: (data: ITransactionDataProp) => void;
    getTransactions: () => void;

}
