import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import monthTransactionAction from './month-transaction.action';
import monthTransConstants from './month-transaction.constant';
import moneyManagerAction from '../../../money-manager/money-manager.action';
import TransactionsService from '../../../shared/service/transactions/transactions.service';
import * as selectors from './selectors';
import AsyncStorageService from '../../../shared/service/async-storage/async-storage.service';
import appConstants from '../../../appConstants';
import transactionListAction from '../../transaction-list.action';
import { AdMobInterstitial } from 'expo-ads-admob';

export default [
    takeLatest(monthTransConstants.MONTH_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(monthTransConstants.CHANGE_MONTH, getTransactionByDate)
];



export function* initialize() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        yield call(showInterstitialAd);
        const date = new Date();
        const monthStart = moment(date).startOf('month');
        const monthEnd = moment(date).endOf('month');

        yield put(monthTransactionAction.changeMonth(monthStart, monthEnd));
        yield call(getTransactionByDate);
        const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
        yield put(monthTransactionAction.monthTransSetUserCurrency(uCurrency));
        yield put(monthTransactionAction.monthTransactionInitializeFinish());
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][month-transaction][saga][initialize]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function* calculateBalance() {
    try {
        const transactions = yield select(selectors.getTransactions);
        const { income, expense, balance } = TransactionsService.calculateBalance(transactions);
        yield put(monthTransactionAction.setBalanceInfo(income, expense, balance))
    } catch (e) {
        console.log(`[error][month-transaction][saga][calculateBalance]>>> ${e}`);
    }
}

export function* getTransactionByDate() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        const currentMonthStart = yield select(selectors.getCurrentMonthStart);
        const currentMonthEnd = yield select(selectors.getCurrentMonthEnd);
        const transactionsMonth = yield call(TransactionsService.getTransactionByDateRange, currentMonthStart, currentMonthEnd);
        yield put(monthTransactionAction.setMonthTransactions(transactionsMonth));
        yield call(calculateBalance);
        const tByCategory = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY);
        yield put(transactionListAction.setTransactionsByCategory(tByCategory));
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][month-transaction][saga][getTransactionByDate]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}


export function* showInterstitialAd() {
    try {
        const rand = Math.random() * (100);
        if (rand > 100) {
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