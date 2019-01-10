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

export default [
    takeLatest(DAY_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(SAVE_NEW_TRANSACTION, newTransaction),
    takeLatest(SET_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(UPDATE_TRANSACTION, updateTransaction),
    takeLatest(CHANGE_DATE, onDateChange)

];



export function* initialize() {
    try {
        console.log(`[dayTransactions][saga][initialize]`);
        const transactions = yield call(FirebaseService.getTransactions);
        console.log(`[dayTransactions][saga][transactions]`, transactions);

        const today = moment();
        yield call(onDateChange, { value: today })
        yield put(dayTransactionAction.dayTransactionInitializeFinish());
    } catch (e) {
        console.log(`[error][day-transaction][saga][initialize]>>> ${e}`);
    }
}

export function* calculateBalance() {
    const transactions = yield select(selectors.getTransactions);
    var income = 0;
    var expense = 0;
    var balance = 0;
    transactions.forEach(element => {
        if(element.isExpense){
            expense+=element.value;
        }else{
            income+=element.value;
        }
    });
    balance = income - expense;
    yield put(dayTransactionAction.setBalanceInfo(income, expense, balance))
}

export function* newTransaction(action) {
    try {
        console.log(`[dayTransactions][saga][newTransaction]`, action.value);
        if (action.value.id.includes('transaction_')){
            const data = yield call(FirebaseService.addToCollection, 'transactions', { ...action.value, date: action.value.date.toDate() });
            if (data.id) {
                yield put(dayTransactionAction.removeTransaction(action.value))
                yield put(dayTransactionAction.saveNewTransaction({ ...action.value, id: data.id }))
            }
        } else {
            yield call(updateTransaction, action);
        }
        
        yield call(calculateBalance);
    } catch (e) {
        console.log(`[error][day-transaction][saga][newTransaction]>>> ${e}`);
    }
}

export function* transactionToDetail(action) {
    try {
        console.log(`[dayTransactions][saga][transactionToDetail]`, action.value);
            yield call(NavigationService.navigateTo, appConstants.routName.newTransaction, 
                { data: action.value.transaction, 
                    onClose:NavigationService.navigateBack,
                    onSave: action.value.onSave
                }
            );
    } catch (e) {
        console.log(`[error][day-transaction][saga][transactionToDetail]>>> ${e}`);
    }
}


export function* updateTransaction(action) {
    try {
        console.log(`[dayTransactions][saga][updateTransaction]`, action.value);
        if (action.value.id.includes('transaction_')) {
            yield call(newTransaction, action);
        } else {
            yield call(FirebaseService.updateDocumentInCollection, 'transactions', { ...action.value, date: action.value.date.toDate() });
            yield call(calculateBalance);
        }
    } catch (e) {
        console.log(`[error][day-transaction][saga][updateTransaction]>>> ${e}`);
    }
}

export function* onDateChange(action) {
    try {
        console.log(`[dayTransactions][saga][onDateChange]`);
        const date = action.value.toDate();
        date.setHours(0, 0, 0, 0);

        const transactionsDay = yield call(FirebaseService.getAllFromCollectionWhere, 'transactions', ["date", "==", date]);
        console.log(`[dayTransactions][saga][onDateChange][transactionsDay]`, date, '....', transactionsDay);

        yield put(dayTransactionAction.setDayTransactions(transactionsDay));
        yield call(calculateBalance);
    } catch (e) {
        console.log(`[error][day-transaction][saga][onDateChange]>>> ${e}`);
    }
}
