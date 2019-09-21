import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import weekTransactionAction from './week-transaction.action';
import weekTransactionConstants from './week-transaction.constant';
import moneyManagerAction from '../../../money-manager/money-manager.action';
import TransactionsService from '../../../shared/service/transactions/transactions.service';
import * as selectors from './selectors';
import AsyncStorageService from '../../../shared/service/async-storage/async-storage.service';
import appConstants from '../../../appConstants';
import transactionListAction from '../../transaction-list.action';
import { AdMobInterstitial } from 'expo-ads-admob';

export default [
    takeLatest(weekTransactionConstants.WEEK_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(weekTransactionConstants.CHANGE_WEEK, getTransactionByDate)
];



export function* initialize() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        yield call(showInterstitialAd);
        const date = new Date();
        const weekStart = moment(date).startOf('isoWeek');
        const weekEnd = moment(date).endOf('isoWeek');
        yield put(weekTransactionAction.changeWeek(weekStart, weekEnd));
        const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
        yield put(weekTransactionAction.weekTransSetUserCurrency(uCurrency));
        yield put(weekTransactionAction.weekTransactionInitializeFinish());
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][week-transaction][saga][initialize]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function* calculateBalance() {
    try {
        const transactions = yield select(selectors.getTransactions);
        const { income, expense, balance } = TransactionsService.calculateBalance(transactions);
        yield put(weekTransactionAction.setBalanceInfo(income, expense, balance))
    } catch (e) {
        console.log(`[error][week-transaction][saga][calculateBalance]>>> ${e}`);
    }
}

export function* getTransactionByDate() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        const currentWeekStart = yield select(selectors.getCurrentWeekStart);
        const currentWeekEnd = yield select(selectors.getCurrentWeekEnd);

        const transactionsWeek = yield call(TransactionsService.getTransactionByDateRange, currentWeekStart, currentWeekEnd);
        yield put(weekTransactionAction.setWeekTransactions(transactionsWeek));
        const tByCategory = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY);
        yield put(transactionListAction.setTransactionsByCategory(tByCategory));
        yield call(calculateBalance);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][week-transaction][saga][getTransactionByDateRange]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}


export function* showInterstitialAd() {
    try {
        const rand = Math.random() * (100);
        if (rand > 80) {
            yield put(moneyManagerAction.moneyManagerShowSpinner());
            AdMobInterstitial.setAdUnitID('ca-app-pub-5759535791118818/6182743744'); // Test ID, Replace with your-admob-unit-id
            AdMobInterstitial.setTestDeviceID('EMULATOR');
            yield call(AdMobInterstitial.requestAdAsync);
            yield call(AdMobInterstitial.showAdAsync);
            yield put(moneyManagerAction.moneyManagerHideSpinner());
        }

    } catch (e) {
        console.log(`[error][day-transaction][saga][initialize]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}