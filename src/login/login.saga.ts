import { put, takeLatest, call, all } from 'redux-saga/effects';
import loginAction from './login.action';
import loginConstants from './login.constant';
import NavigationService from '../shared/service/navigation/navigation.service';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import appConstants from '../appConstants';
import i18n from '../shared/service/i18n';
import sqLiteService from '../shared/service/sqLite/sqLite.service';
import moment from 'moment';

let pkg = require('../../package.json');

export default [
    takeLatest(loginConstants.LOGIN_INITIALIZE_START, initialize),
    takeLatest(loginConstants.REGISTER_SUBMIT, registerNewUser),
    takeLatest(loginConstants.LOGIN_SUBMIT, logInUser),
    takeLatest(loginConstants.RECOVER_PASSWORD, recoverPassword),
    takeLatest(loginConstants.LOGIN_SET_CURRENT_LANGUAGE, updateLanguage),
    takeLatest(loginConstants.LOGIN_MODE, loginModeChange)
];

export function* initialize() {
    try {
        const uLanguage = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_LANGUAGE);
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
        yield call(setUserData, response.user.uid, userName);
        yield put(loginAction.errorMessage(''));
        yield put(loginAction.showSpinner(false));
        yield call(NavigationService.navigateTo, appConstants.routName.moneyManager);

    } catch (e) {
        console.log(`[error][login][saga][registerNewUser]>>>`, e);
        yield put(loginAction.showSpinner(false));
        yield put(loginAction.errorMessage(i18n.t("loginScreen." + e.code)));
    }
}

export function* logInUser(action) {
    const {userName, password } = action.value;
    try {
        yield put(loginAction.showSpinner(true));
        const response = yield call(FirebaseService.logIn, userName, password);
        yield call(syncDataWithFirebase, response.user.uid);
        yield call(setUserData, response.user.uid, userName);
        yield put(loginAction.errorMessage(''));
        yield put(loginAction.showSpinner(false));
        yield call(NavigationService.navigateTo, appConstants.routName.moneyManager);

    } catch (e) {
        yield put(loginAction.showSpinner(false));
        yield put(loginAction.errorMessage(e.message));
        console.log(`[error][login][saga][logInUser]>>> `,e);
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
        console.log(`[error][login][saga][logInUser]>>> `, e);
    }
}

export function* updateLanguage(action) {
    try {
        yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.USER_LANGUAGE, action.value);
        yield put(loginAction.errorMessage(''));
    } catch (e) {
        console.log(`[error][login][saga][initialize]>>> `, e);
    }
}


export function* loginModeChange(action) {
    try {
        yield put(loginAction.errorMessage(''));
    } catch (e) {
        console.log(`[error][login][saga][initialize]>>> `, e);
    }
}

export function* setUserData(uid, mail) {
    const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
    const uLanguage = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_LANGUAGE);
    if (!uCurrency) {
        yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.USER_CURRENCY, uLanguage.currency);

    }
    yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.USER_ID, uid);
    yield call(sqLiteService.addOrReplaceUser, { id: uid, mail, language: uLanguage.code, currency: uCurrency.name || uLanguage.currency, version: pkg.version, lastLogIn: moment().toString() });
}


function* syncDataWithFirebase(uid) {
    try {
        const user = yield call(sqLiteService.getUser, uid);
        const date = user && user.lastLogIn ? user.lastLogIn : new Date(0); 
        const dataAccounts = yield call(FirebaseService.getAccountsAfterDate, date, uid);
        yield all(dataAccounts.map(e => {
            if (e.deleted == true) {
                return call(sqLiteService.removeAccount, { id: e.id, firebaseId: e.firebaseId, uid: e.uid });
            } else {
                const elem = {
                    id: e.id,
                    name: e.name,
                    uid: e.uid,
                    value: e.value,
                    currency: e.currency,
                    type: e.type,
                    description: e.description,
                    firebaseId: e.firebaseId
                };
                return call(sqLiteService.addAccount, elem);
            }
        }))
        const data = yield call(FirebaseService.getTransactionsAfterDate, date, uid);

        yield all(data.map(e => {
            if (e.deleted == true) {
                return call(sqLiteService.removeTransaction, { id: e.id, firebaseId: e.firebaseId, uid: e.uid });
            } else {
                const elem = {
                    id: e.id,
                    account: e.account,
                    categoryId: e.categoryId,
                    date: moment(e.date).format("YYYY-MM-DD"),
                    isExpense: e.isExpense,
                    oldValue: e.oldValue,
                    subCategory: e.subCategory,
                    uid: e.uid,
                    value: e.value,
                    wasExpense: e.wasExpense,
                    description: e.description,
                    icon: { id: e.imageIconId },
                    firebaseId: e.firebaseId
                };
                return call(sqLiteService.addTransaction, elem);
            }
        }))
        call(sqLiteService.updateUserLastLogin, uid);
    } catch (e) {
        console.log(`[error][splash][login][syncDataWithFirebase]>>> ${e}`);
    }
}