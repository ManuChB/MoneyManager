import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import weekTransactionAction from './week-transaction.action';
import {
    WEEK_TRANSACTION_INITIALIZE_START, WEEK_TRANSACTION_NEW_TRANSACTION,  WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL
} from './week-transaction.constant';
import appConstants from '../../../appConstants';
import FirebaseService from '../../../shared/service/firebase/firebase.service';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import TransactionsService from '../../../shared/service/transactions/transactions.service';

export default [
    takeLatest(WEEK_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(WEEK_TRANSACTION_NEW_TRANSACTION, newTransaction),
    takeLatest(WEEK_TRANSACTION_SET_TRANSACTION_TO_DETAIL, transactionToDetail)

];



export function* initialize() {
    try {
        console.log(`[dayTransactions][saga][initialize]`);
        yield put(weekTransactionAction.weekTransactionInitializeFinish());
    } catch (e) {
        console.log(`[error][day-transaction][saga][initialize]>>> ${e}`);
    }
}

export function* newTransaction(action) {
    try {
        const data = yield call(TransactionsService.newTransaction, action.value);
        yield call(updateTransaction, { value: { ...action.value, id: data.id } });

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
//        yield call(TransactionsService.updateTransaction, action.value, day);
 //       yield call(getTransactionByDate, { value: day });

    } catch (e) {
        console.log(`[error][day-transaction][saga][updateTransaction]>>> ${e}`);
    }
}



