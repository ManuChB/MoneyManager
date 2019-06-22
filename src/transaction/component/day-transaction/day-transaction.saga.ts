import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import dayTransactionAction from './day-transaction.action';
import { DAY_TRANSACTION_INITIALIZE_START, SAVE_NEW_TRANSACTION, 
    SET_TRANSACTION_TO_DETAIL,UPDATE_TRANSACTION, CHANGE_DATE } from './day-transaction.constant';
import appConstants from '../../../appConstants';
import FirebaseService from '../../../shared/service/firebase/firebase.service';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import * as selectors from './selectors';
import TransactionsService from '../../../shared/service/transactions/transactions.service';

export default [
    takeLatest(DAY_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(SAVE_NEW_TRANSACTION, newTransaction),
    takeLatest(SET_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(UPDATE_TRANSACTION, updateTransaction),
    takeLatest(CHANGE_DATE, getTransactionByDate)

];



export function* initialize() {
    try {
        const today = moment();
        yield call(getTransactionByDate, { value: today })
        yield put(dayTransactionAction.dayTransactionInitializeFinish());
    } catch (e) {
        console.log(`[error][day-transaction][saga][initialize]>>> ${e}`);
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
        const { transaction, onSave } = action.value;
        yield call(TransactionsService.transactionToDetail, transaction, onSave);

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

        const transactionsDay = yield call(TransactionsService.getTransactionByDate, action.value);
        yield put(dayTransactionAction.setDayTransactions(transactionsDay));
        yield call(calculateBalance);
    } catch (e) {
        console.log(`[error][day-transaction][saga][getTransactionByDate]>>> ${e}`);
    }
}
