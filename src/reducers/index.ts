import { combineReducers } from 'redux';

import navigation from './navigationReducer';
import splash from '../splash/splash.reducer';
import login from '../login/login.reducer';
import moneyManager from '../money-manager/money-manager.reducer';
import transactionList from '../transaction/transaction-list.reducer';
import dayTransaction from '../transaction/component/day-transaction/day-transaction.reducer';
import newTransaction from '../transaction/component/new-transaction-modal/new-transaction-modal.reducer';
import accountList from '../account/account-list.reducer';
import accountDetail from '../account/account-detail/account-detail.reducer';

export interface State {
    navigation: any;
    splash: any;
    login: any;
    moneyManager: any;
    transactionList: any;
    dayTransaction: any;
    newTransaction: any;
    accountList: any;
    accountDetail: any;
}

const rootReducer = combineReducers<State>({
    navigation,
    splash,
    login,
    moneyManager,
    transactionList,
    dayTransaction,
    newTransaction,
    accountList,
    accountDetail

});

export default rootReducer;
