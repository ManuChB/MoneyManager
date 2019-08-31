import { put, takeLatest, call, all } from 'redux-saga/effects';
import splashAction from './splash.action';
import { INITIALIZE_START } from './splash.constant';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import i18nService, {
    languages, defaultLanguage
} from '../shared/service/i18n';
import i18n from 'i18n-js';

import * as Localization from 'expo-localization';
import SQLiteService from '../shared/service/sqLite/sqLite.service';

export default [
    takeLatest(INITIALIZE_START, initialize)
];


export function* initialize() {
    try {
        yield call(SQLiteService.init)
        yield call(FirebaseService.init);
        yield call(setDefaultParams);
        const uid = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_ID);
        if(uid) {
            yield call(NavigationService.navigateTo, appConstants.routName.moneyManager);
        }
        else {
            yield call(NavigationService.navigateTo, appConstants.routName.login);
        }
        yield put(splashAction.initializeFinish());
    } catch (e) {
        console.log(`[error][splash][saga][initialize]>>> ${e}`);
    }
}

export function* setDefaultParams() {
    i18nService.setI18n(i18n);
    const uLanguage = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_LANGUAGE);
    if (uLanguage) {
        i18nService.setLocale(uLanguage.code);
    } else {
        const deviceLanguage = languages.filter(
            function (language) {
                return language.code == Localization.locale;
            }
        )[0];
        yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.USER_LANGUAGE, deviceLanguage || defaultLanguage);
        i18nService.setLocale(deviceLanguage ? deviceLanguage.code : defaultLanguage.code);
    }
    const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
    if(!uCurrency) {
        yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.USER_CURRENCY, defaultLanguage.currency);

    }


}


