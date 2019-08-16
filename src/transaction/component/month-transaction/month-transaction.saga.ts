import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import monthTransactionAction from './month-transaction.action';
import monthTransConstants from './month-transaction.constant';
import appConstants from '../../../appConstants';
import FirebaseService from '../../../shared/service/firebase/firebase.service';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import TransactionsService from '../../../shared/service/transactions/transactions.service';
import * as selectors from './selectors';

export default [
    takeLatest(monthTransConstants.MONTH_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(monthTransConstants.MONTH_TRANSACTION_NEW_TRANSACTION, newTransaction),
    takeLatest(monthTransConstants.MONTH_TRANSACTION_SET_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(monthTransConstants.CHANGE_MONTH, getTransactionByDate),
    takeLatest(monthTransConstants.SET_MONTH_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(monthTransConstants.UPDATE_MONTH_TRANSACTION, updateTransaction),
];



export function* initialize() {
    try {
        const date = new Date();
        const monthStart = moment(date).startOf('month');
        const monthEnd = moment(date).endOf('month');

        yield put(monthTransactionAction.changeMonth(monthStart, monthEnd));
        yield call(getTransactionByDate);
        yield put(monthTransactionAction.monthTransactionInitializeFinish());
    } catch (e) {
        console.log(`[error][month-transaction][saga][initialize]>>> ${e}`);
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
    console.log(`[month-transaction][saga][getTransactionByDate]`);
    try {
        const currentMonthStart = yield select(selectors.getCurrentMonthStart);
        const currentMonthEnd = yield select(selectors.getCurrentMonthEnd);
        const transactionsMonth = yield call(TransactionsService.getTransactionByDateRange, currentMonthStart, currentMonthEnd);
        yield put(monthTransactionAction.setMonthTransactions(transactionsMonth));
        yield call(calculateBalance);
    } catch (e) {
        console.log(`[error][month-transaction][saga][getTransactionByDate]>>> ${e}`);
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
        const { transaction, onSave } = action.value;
        yield call(TransactionsService.transactionToDetail, transaction, onSave);

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



