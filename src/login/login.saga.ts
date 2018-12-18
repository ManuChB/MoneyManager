import { put, takeLatest, call } from 'redux-saga/effects';
import loginAction from './login.action';
import { LOGIN_INITIALIZE_START, REGISTER_SUBMIT, LOGIN_SUBMIT } from './login.constant';
import NavigationService from '../shared/service/navigation/navigation.service';
import FirebaseService from '../shared/service/firebase/firebase.service';
import appConstants from '../appConstants';

export default [
    takeLatest(LOGIN_INITIALIZE_START, initialize),
    takeLatest(REGISTER_SUBMIT, registerNewUser),
    takeLatest(LOGIN_SUBMIT, logInNewUser)
];

export function* initialize() {
    try {
        console.log(`[login][saga][initialize]`);
        yield call(NavigationService.navigateTo, appConstants.routName.splash);
        yield put(loginAction.loginInitializeFinish());
    } catch (e) {
        console.log(`[error][login][saga][initialize]>>> ${e}`);
    }
}

export function* registerNewUser(action) {
    const {userName, password } = action.value;
    try {
        const response = yield call(FirebaseService.newUser, userName, password);
        console.log(`[login][saga][registerNewUser]`, response);
        yield put(loginAction.errorMessage(''));

    } catch (e) {
        yield put(loginAction.errorMessage(e.message));
        console.log(`[error][login][saga][registerNewUser]>>> ${e}`);
    }
}

export function* logInNewUser(action) {
    const {userName, password } = action.value;
    try {
        const response = yield call(FirebaseService.logIn, userName, password);
        console.log(`[login][saga][logInNewUser]`, response);
        yield put(loginAction.errorMessage(''));

    } catch (e) {
        yield put(loginAction.errorMessage(e.message));
        console.log(`[error][login][saga][logInNewUser]>>> ${e}`);
    }
}
