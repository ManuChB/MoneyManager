import { put, takeLatest, call } from 'redux-saga/effects';
import loginAction from './login.action';
import loginConstants from './login.constant';
import NavigationService from '../shared/service/navigation/navigation.service';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import appConstants from '../appConstants';

export default [
    takeLatest(loginConstants.LOGIN_INITIALIZE_START, initialize),
    takeLatest(loginConstants.REGISTER_SUBMIT, registerNewUser),
    takeLatest(loginConstants.LOGIN_SUBMIT, logInUser),
    takeLatest(loginConstants.RECOVER_PASSWORD, recoverPassword),
    takeLatest(loginConstants.LOGIN_SET_CURRENT_LANGUAGE, updateLanguage)
];

export function* initialize() {
    try {
        const uLanguage = yield call(AsyncStorageService.getItem, 'USER_LANGUAGE');
        yield put(loginAction.loginSetCurrentLanguage(uLanguage));

        yield put(loginAction.loginInitializeFinish());
    } catch (e) {
        console.log(`[error][login][saga][initialize]>>> ${e}`);
    }
}

export function* registerNewUser(action) {
    const {userName, password } = action.value;
    try {
        yield put(loginAction.showSpinner(true));
        const response = yield call(FirebaseService.newUser, userName, password);
        yield call(AsyncStorageService.setItem, 'USER_ID', response.user.uid);
        yield put(loginAction.errorMessage(''));
        yield put(loginAction.showSpinner(false));
        yield call(NavigationService.navigateTo, appConstants.routName.moneyManager);

    } catch (e) {
        yield put(loginAction.showSpinner(false));
        yield put(loginAction.errorMessage(e.message));
        console.log(`[error][login][saga][registerNewUser]>>> ${e}`);
    }
}

export function* logInUser(action) {
    const {userName, password } = action.value;
    try {
        yield put(loginAction.showSpinner(true));
        const response = yield call(FirebaseService.logIn, userName, password);
        yield call(AsyncStorageService.setItem, 'USER_ID', response.user.uid);
        yield put(loginAction.errorMessage(''));
        yield put(loginAction.showSpinner(false));
        yield call(NavigationService.navigateTo, appConstants.routName.moneyManager);

    } catch (e) {
        yield put(loginAction.showSpinner(false));
        yield put(loginAction.errorMessage(e.message));
        console.log(`[error][login][saga][logInUser]>>> ${e}`);
    }
}

export function* recoverPassword(action) {
    const { userName } = action.value;
    try {
        yield put(loginAction.showSpinner(true));
        yield call(FirebaseService.RecoverPassword, userName);
        yield put(loginAction.errorMessage(''));
        yield put(loginAction.showSpinner(false));
    } catch (e) {
        yield put(loginAction.showSpinner(false));
        yield put(loginAction.errorMessage(e.message));
        console.log(`[error][login][saga][logInUser]>>> ${e}`);
    }
}

export function* updateLanguage(action) {
    try {
        yield call(AsyncStorageService.setItem, 'USER_LANGUAGE', action.value);
    } catch (e) {
        console.log(`[error][login][saga][initialize]>>> ${e}`);
    }
}