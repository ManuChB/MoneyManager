import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import weekTransactionAction from './week-transaction.action';
import weekTransactionConstants from './week-transaction.constant';
import moneyManagerAction from '../../../money-manager/money-manager.action';
import TransactionsService from '../../../shared/service/transactions/transactions.service';
import * as selectors from './selectors';

export default [
    takeLatest(weekTransactionConstants.WEEK_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(weekTransactionConstants.WEEK_TRANSACTION_NEW_TRANSACTION, newTransaction),
    takeLatest(weekTransactionConstants.CHANGE_WEEK, getTransactionByDate),
    takeLatest(weekTransactionConstants.SET_WEEK_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(weekTransactionConstants.UPDATE_WEEK_TRANSACTION, updateTransaction),
    takeLatest(weekTransactionConstants.WEEK_TRANSACTION_REMOVE_TRANSACTION, removeTransaction)
];



export function* initialize() {
    try {
        const date = new Date();
        const weekStart = moment(date).startOf('isoWeek');
        const weekEnd = moment(date).endOf('isoWeek');
        yield put(weekTransactionAction.changeWeek(weekStart, weekEnd));
        yield put(weekTransactionAction.weekTransactionInitializeFinish());
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
        yield call(calculateBalance);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][week-transaction][saga][getTransactionByDateRange]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function* newTransaction(action) {
    try {
        const data = yield call(TransactionsService.newTransaction, action.value.transaction);
        yield call(getTransactionByDate, action);

    } catch (e) {
        console.log(`[error][week-transaction][saga][newTransaction]>>> ${e}`);
    }
}

export function* transactionToDetail(action) {
    try {
        const { transaction, onSave, onRemove } = action.value;
        yield call(TransactionsService.transactionToDetail, transaction, onSave, onRemove);

    } catch (e) {
        console.log(`[error][week-transaction][saga][transactionToDetail]>>> ${e}`);
    }
}


export function* updateTransaction(action) {
    try {
        console.log(`[week-transaction][saga][updateTransaction]>>>day ${action}`,action);

        yield call(TransactionsService.updateTransaction, action.value, action.date);
        yield call(getTransactionByDate, { value: action.date });

    } catch (e) {
        console.log(`[error][week-transaction][saga][updateTransaction]>>> ${e}`);
    }
}


export function* removeTransaction(action) {
    try {
        yield call(TransactionsService.removeTransaction, action.value);
        yield call(calculateBalance);
    } catch (e) {
        console.log(`[error][day-transaction][saga][removeTransaction]>>> ${e}`);
    }
}

