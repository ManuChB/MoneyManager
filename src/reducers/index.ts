import { combineReducers } from 'redux';

import navigation from './navigationReducer';
import splash from '../splash/splash.reducer';
import login from '../login/login.reducer';
import moneyManager from '../money-manager/money-manager.reducer';
import transaction from '../transaction/transaction.reducer';
import dayTransaction from '../transaction/component/day-transaction/day-transaction.reducer';

export interface State {
    navigation: any;
    splash: any;
    login: any;
    moneyManager: any;
    transaction: any;
    dayTransaction: any;
}

const rootReducer = combineReducers<State>({
    navigation,
    splash,
    login,
    moneyManager,
    transaction,
    dayTransaction

});

export default rootReducer;
