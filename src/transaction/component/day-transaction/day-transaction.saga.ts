import { put, takeLatest, call, select } from 'redux-saga/effects';
import _ from 'lodash';

import dayTransactionAction from './day-transaction.action';
import dayTransactionsConstants from './day-transaction.constant';
import moneyManagerAction from '../../../money-manager/money-manager.action';
import * as selectors from './selectors';
import TransactionsService from '../../../shared/service/transactions/transactions.service';
import transactionListAction from '../../transaction-list.action';
import AsyncStorageService from '../../../shared/service/async-storage/async-storage.service';
import appConstants from '../../../appConstants';
import { AdMobInterstitial } from 'expo-ads-admob';

export default [
    takeLatest(dayTransactionsConstants.DAY_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(dayTransactionsConstants.CHANGE_DATE, getTransactionByDate),
];

export function* initialize() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        yield call(showInterstitialAd);
        const day = yield select(selectors.getDayTransaction);
        yield call(getTransactionByDate, { value: day });
        const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
        yield put(dayTransactionAction.dayTransSetUserCurrency(uCurrency));
        yield put(dayTransactionAction.dayTransactionInitializeFinish());
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][day-transaction][saga][initialize]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());

    }
}

export function* calculateBalance() {
    try {
        const transactions = yield select(selectors.getTransactions);
        const {income, expense, balance } = TransactionsService.calculateBalance(transactions);
        yield put(dayTransactionAction.setBalanceInfo(income, expense, balance))
    } catch (e) {
        console.log(`[error][day-transaction][saga][calculateBalance]>>> ${e}`);
    }
}

export function* updateAccountValue(transaction) {
    try {
        yield call(TransactionsService.updateAccountValue, transaction);
    } catch (e) {
        console.log(`[error][day-transaction][saga][updateAccountValue]>>> ${e}`);
    }
}

export function* getTransactionByDate(action) {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        const transactionsDay = yield call(TransactionsService.getTransactionByDate, action.value);
        yield put(dayTransactionAction.setDayTransactions(transactionsDay));
        const tByCategory = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY);
        yield put(transactionListAction.setTransactionsByCategory(tByCategory));
        yield call(calculateBalance);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][day-transaction][saga][getTransactionByDate]>>> ${e}`);
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