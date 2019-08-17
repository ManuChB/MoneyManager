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
import weekTransaction from '../transaction/component/week-transaction/week-transaction.reducer';
import monthTransaction from '../transaction/component/month-transaction/month-transaction.reducer';
import settings from '../settings/settings.reducer';
import report from '../report/report.reducer';
import { i18nReducer as i18n } from 'redux-react-native-i18n';


export interface State {
    i18n: any,
    navigation: any;
    splash: any;
    login: any;
    moneyManager: any;
    transactionList: any;
    dayTransaction: any;
    newTransaction: any;
    accountList: any;
    accountDetail: any;
    weekTransaction: any;
    monthTransaction: any;
    settings: any;
    report: any;
}

const rootReducer = combineReducers<State>({
    i18n,
    navigation,
    splash,
    login,
    moneyManager,
    transactionList,
    dayTransaction,
    newTransaction,
    accountList,
    accountDetail,
    weekTransaction,
    monthTransaction,
    settings,
    report

});

export default rootReducer;
