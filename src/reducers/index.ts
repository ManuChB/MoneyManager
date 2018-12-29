import { combineReducers } from 'redux';

import navigation from './navigationReducer';
import splash from '../splash/splash.reducer';
import login from '../login/login.reducer';
import moneyManager from '../money-manager/money-manager.reducer';
import transaction from '../transaction/transaction.reducer';

export interface State {
    navigation: any;
    splash: any;
    login: any;
    moneyManager: any;
    transaction: any;
}

const rootReducer = combineReducers<State>({
    navigation,
    splash,
    login,
    moneyManager,
    transaction

});

export default rootReducer;
