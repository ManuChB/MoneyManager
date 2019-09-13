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
import axios from 'axios';
import sqLiteService from '../shared/service/sqLite/sqLite.service';
import moment from 'moment';

export default [
    takeLatest(INITIALIZE_START, initialize)
];


export function* initialize() {
    try {
        yield call(SQLiteService.init);
        yield call(FirebaseService.init);
        yield call(setDefaultParams);
        const uid = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_ID);
        if(uid) {
            yield call(syncDataWithFirebase, uid);
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
    try {
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
        const currency = uCurrency ? uCurrency.name : defaultLanguage.currency.name;
        const rates = yield call(getRatesFromAPI, currency)
        yield call(AsyncStorageService.setItem, appConstants.asyncStorageItem.RATES, rates);
    } catch (e) {
        console.log(`[error][splash][saga][setDefaultParams]>>> ${e}`);
    }
}


function getRatesFromAPI(currency) {
    return axios.get(
        `http://api.openrates.io/latest?base=${currency}`
    )
        .then(response => {
            return response.data.rates;

        })
        .catch(error => {
            console.log(`[error][splash][saga][getRatesFromAPI]>>> ${error}`);
        });
}


function* syncDataWithFirebase(uid) {
    try {
        const user = yield call(sqLiteService.getUser, uid);
        const dataAccounts = yield call(FirebaseService.getAccountsAfterDate, user.lastLogIn, uid);

        yield all(dataAccounts.map(e => {
            if(e.deleted == true){
                return call(sqLiteService.removeAccount, {id: e.id , uid: e.uid});
            }else {
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
        const data = yield call(FirebaseService.getTransactionsAfterDate,user.lastLogIn ,uid);
        yield all(data.map(e => {
            if (e.deleted == true) {
                return call(sqLiteService.removeTransaction, { id: e.id, uid: e.uid });
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
                    icon: null,
                    firebaseId: e.id
                };
                return call(sqLiteService.addTransaction, elem);
            }
        }) )
        call(sqLiteService.updateUserLastLogin, uid);
    } catch (e) {
        console.log(`[error][splash][saga][syncDataWithFirebase]>>> ${e}`);
    }
}
