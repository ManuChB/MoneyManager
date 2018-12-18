import { combineReducers } from 'redux';

import navigation from './navigationReducer';
import splash from '../splash/splash.reducer';
import login from '../login/login.reducer';

export interface State {
    navigation: any;
    splash: any;
    login: any;
}

const rootReducer = combineReducers<State>({
    navigation,
    splash,
    login

});

export default rootReducer;
