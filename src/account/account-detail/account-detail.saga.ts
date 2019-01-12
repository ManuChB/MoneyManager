import { put, takeLatest, call } from 'redux-saga/effects';

import accountDetailAction from './account-detail.action';
import {
    ACCOUNT_DETAIL_INITIALIZE_START
} from './account-detail.constant';
import FirebaseService from '../../shared/service/firebase/firebase.service';
import asyncStorageService from '../../shared/service/async-storage/async-storage.service';


export default [
    takeLatest(ACCOUNT_DETAIL_INITIALIZE_START, initialize)
];



export function* initialize() {
    try {
        console.log(`[accountDetailAction][saga][initialize]`);
        const currencyList = yield call(asyncStorageService.getItem, 'CURRENCIES');
        const accountTypeList = yield call(asyncStorageService.getItem, 'ACCOUNT_TYPES');
        console.log(`[accountDetailAction][saga][initialize]`, currencyList, accountTypeList);

        yield put(accountDetailAction.setPickersData(currencyList, accountTypeList));

        yield put(accountDetailAction.accountDetailInitializeFinish());
    } catch (e) {
        console.log(`[error][accountDetailAction][saga][initialize]>>> ${e}`);
    }
}


