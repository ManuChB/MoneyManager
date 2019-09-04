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

export default [
    takeLatest(monthTransConstants.MONTH_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(monthTransConstants.MONTH_TRANSACTION_NEW_TRANSACTION, newTransaction),
    takeLatest(monthTransConstants.CHANGE_MONTH, getTransactionByDate),
    takeLatest(monthTransConstants.SET_MONTH_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(monthTransConstants.UPDATE_MONTH_TRANSACTION, updateTransaction),
    takeLatest(monthTransConstants.MONTH_TRANSACTION_REMOVE_TRANSACTION, removeTransaction)
];



export function* initialize() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
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

export function* newTransaction(action) {
    try {
        const data = yield call(TransactionsService.newTransaction, action.value.transaction);
        yield call(getTransactionByDate, action);

    } catch (e) {
        console.log(`[error][month-transaction][saga][newTransaction]>>> ${e}`);
    }
}

export function* transactionToDetail(action) {
    try {
        const { transaction, onSave, onRemove } = action.value;
        yield call(TransactionsService.transactionToDetail, transaction, onSave, onRemove);

    } catch (e) {
        console.log(`[error][month-transaction][saga][transactionToDetail]>>> ${e}`);
    }
}


export function* updateTransaction(action) {
    try {
        console.log(`[month-transaction][saga][updateTransaction]>>>day ${action}`, action);

        yield call(TransactionsService.updateTransaction, action.value, action.date);
        yield call(getTransactionByDate, { value: action.date });

    } catch (e) {
        console.log(`[error][month-transaction][saga][updateTransaction]>>> ${e}`);
    }
}

export function* removeTransaction(action) {
    try {
        yield call(TransactionsService.removeTransaction, action.value);
        yield call(calculateBalance);
        const transactions = yield select(selectors.getTransactions);
        yield call(TransactionsService.orderTransactionByCategory, transactions);
        const tByCategory = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY);
        yield put(transactionListAction.setTransactionsByCategory(tByCategory));
    } catch (e) {
        console.log(`[error][day-transaction][saga][removeTransaction]>>> ${e}`);
    }
}

