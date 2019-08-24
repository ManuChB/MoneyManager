import { put, takeLatest, call } from 'redux-saga/effects';
import settingsAction from './settings.action';
import settingsConstants from './settings.constants';
import NavigationService from '../shared/service/navigation/navigation.service';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import appConstants from '../appConstants';
import moneyManagerAction from '../money-manager/money-manager.action';

export default [
    takeLatest(settingsConstants.SETTINGS_INITIALIZE_START, initialize),
    takeLatest(settingsConstants.SETTINGS_SET_CURRENT_LANGUAGE, updateLanguage),
    takeLatest(settingsConstants.SETTINGS_LOG_OUT, logOut),
    takeLatest(settingsConstants.SETTINGS_SET_CURRENT_CURRRENCY, updateCurrency)
];

export function* initialize() {
    try {
        const uLanguage = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_LANGUAGE );
        yield put(settingsAction.settingsSetCurrentLanguage(uLanguage));
        const currencyList = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.CURRENCIES);
        yield put(settingsAction.settingsSetCurrencyList(currencyList));
        const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
        yield put(settingsAction.settingsSetCurrentCurrency(uCurrency));

        yield put(settingsAction.settingsInitializeFinish());
    } catch (e) {
        console.log(`[error][settings][saga][initialize]>>> ${e}`);
    }
}

export function* updateLanguage(action) {
    try {
        yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.USER_LANGUAGE, action.value);
    } catch (e) {
        console.log(`[error][settings][saga][updateLanguage]>>> ${e}`);
    }
}

export function* updateCurrency(action) {
    try {
        yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.USER_CURRENCY, action.value);
    } catch (e) {
        console.log(`[error][settings][saga][updateCurrency]>>> ${e}`);
    }
}

export function* logOut() {
    try {
        yield call(AsyncStorageService.removeItem, 'USER_ID');
        yield call(NavigationService.navigateTo, appConstants.routName.login);
        yield put(moneyManagerAction.moneyManagerTabModeChange(appConstants.tabMode.transaction));
    } catch (e) {
        console.log(`[error][settings][saga][logOut]>>> ${e}`);
    }

}

