import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { ITransactionDataProp } from '../transaction/transaction.component';

export interface ITransactionDetailProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ITransactionDetailState;
    actions?: ITransactionDetailAction;
}

export interface ITransactionDetailAction {
    newTransactionInitializeStart?: (initialState: ITransactionDetailState) => Action;
    newTransactionInitializeFinish?: () => Action;
    changeData?: (data: ITransactionDataProp) => Action;
    setCategories?: (categories: Array<any>) => Action;
}

export interface ITransactionDetailState {
    isInitialized?: boolean;
    data: ITransactionDataProp;
    onClose: () => void;
    onSave: (data: ITransactionDataProp) => void;
    categories?: Array<any>;

}
