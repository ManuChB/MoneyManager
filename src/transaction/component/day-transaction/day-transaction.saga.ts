import { put, takeLatest, call, select } from 'redux-saga/effects';
import _ from 'lodash';

import dayTransactionAction from './day-transaction.action';
import dayTransactionsConstants from './day-transaction.constant';
import moneyManagerAction from '../../../money-manager/money-manager.action';
import * as selectors from './selectors';
import TransactionsService from '../../../shared/service/transactions/transactions.service';
import TransactionListActions from '../../transaction-list.action';
import transactionListAction from '../../transaction-list.action';

export default [
    takeLatest(dayTransactionsConstants.DAY_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(dayTransactionsConstants.SAVE_NEW_TRANSACTION, newTransaction),
    takeLatest(dayTransactionsConstants.SET_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(dayTransactionsConstants.UPDATE_TRANSACTION, updateTransaction),
    takeLatest(dayTransactionsConstants.CHANGE_DATE, getTransactionByDate),
    takeLatest(dayTransactionsConstants.DAY_TRANSACTION_LONG_PRESS, longPress),
    takeLatest(dayTransactionsConstants.REMOVE_TRANSACTION, removeTransaction)
];



export function* initialize() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        const day = yield select(selectors.getDayTransaction);
        yield call(getTransactionByDate, { value: day })
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

export function* newTransaction(action) {
    try {
        const data = yield call(TransactionsService.newTransaction, action.value);
        yield call(updateTransaction, {value:{ ...action.value, id: data.id }});

    } catch (e) {
        console.log(`[error][day-transaction][saga][newTransaction]>>> ${e}`);
    }
}

export function* transactionToDetail(action) {
    try {
        const { transaction, onSave, onRemove } = action.value;
        console.log(`[day-transaction][saga][newTransaction]>>> `, transaction);

        yield call(TransactionsService.transactionToDetail, transaction, onSave, onRemove);

    } catch (e) {
        console.log(`[error][day-transaction][saga][transactionToDetail]>>> ${e}`);
    }
}


export function* updateTransaction(action) {
    try {
        const day = yield select(selectors.getDayTransaction);
        yield call(TransactionsService.updateTransaction, action.value, day);
        yield call(getTransactionByDate, { value: day });
        
    } catch (e) {
        console.log(`[error][day-transaction][saga][updateTransaction]>>> ${e}`);
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
        yield call(calculateBalance);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][day-transaction][saga][getTransactionByDate]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function* longPress(action) {
    try {
        yield put(transactionListAction.longPress(action.value));
    } catch (e) {
        console.log(`[error][day-transaction][saga][longPress]>>> ${e}`);
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