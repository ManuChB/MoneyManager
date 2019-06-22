import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import weekTransactionAction from './week-transaction.action';
import {
    WEEK_TRANSACTION_INITIALIZE_START, WEEK_TRANSACTION_NEW_TRANSACTION,  WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL, CHANGE_WEEK
} from './week-transaction.constant';
import appConstants from '../../../appConstants';
import FirebaseService from '../../../shared/service/firebase/firebase.service';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import TransactionsService from '../../../shared/service/transactions/transactions.service';
import * as selectors from './selectors';

export default [
    takeLatest(WEEK_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(WEEK_TRANSACTION_NEW_TRANSACTION, newTransaction),
    takeLatest(WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(CHANGE_WEEK, getTransactionByDate)
];



export function* initialize() {
    try {
        const date = new Date();
        const weekStart = moment(date).startOf('isoWeek');
        const weekEnd = moment(date).endOf('isoWeek');

        yield call(getTransactionByDate, { value: { weekStart, weekEnd}});
        yield put(weekTransactionAction.weekTransactionInitializeFinish());
    } catch (e) {
        console.log(`[error][week-transaction][saga][initialize]>>> ${e}`);
    }
}

export function* calculateBalance() {
    try {
        const transactions = yield select(selectors.getTransactions);
        const { income, expense, balance } = TransactionsService.calculateBalance(transactions);
        yield put(weekTransactionAction.setBalanceInfo(income, expense, balance))
    } catch (e) {
        console.log(`[error][day-transaction][saga][calculateBalance]>>> ${e}`);
    }
}

export function* getTransactionByDate(action) {
    console.log(`[week-transaction][saga][getTransactionByDate]`,action);
    try {
        const transactionsWeek = yield call(TransactionsService.getTransactionByDateRange, action.value.weekStart, action.value.weekEnd);
        yield put(weekTransactionAction.setWeekTransactions(transactionsWeek));
        yield call(calculateBalance);
    } catch (e) {
        console.log(`[error][week-transaction][saga][getTransactionByDate]>>> ${e}`);
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
        const { transaction, onSave } = action.value;
        yield call(TransactionsService.transactionToDetail, transaction, onSave);

    } catch (e) {
        console.log(`[error][week-transaction][saga][transactionToDetail]>>> ${e}`);
    }
}


export function* updateTransaction(action) {
    try {
//        yield call(TransactionsService.updateTransaction, action.value, week);
 //       yield call(getTransactionByDate, { value: day });

    } catch (e) {
        console.log(`[error][week-transaction][saga][updateTransaction]>>> ${e}`);
    }
}



