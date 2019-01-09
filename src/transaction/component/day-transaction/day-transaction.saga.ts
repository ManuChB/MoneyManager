import { put, takeLatest, call, select } from 'redux-saga/effects';
import moment from "moment";
import _ from 'lodash';

import dayTransactionAction from './day-transaction.action';
import { DAY_TRANSACTION_INITIALIZE_START, SAVE_NEW_TRANSACTION, 
    SET_TRANSACTION_TO_DETAIL,UPDATE_TRANSACTION } from './day-transaction.constant';
import appConstants from '../../../appConstants';
import FirebaseService from '../../../shared/service/firebase/firebase.service';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import * as selectors from './selectors';

export default [
    takeLatest(DAY_TRANSACTION_INITIALIZE_START, initialize),
    takeLatest(SAVE_NEW_TRANSACTION, newTransaction),
    takeLatest(SET_TRANSACTION_TO_DETAIL, transactionToDetail),
    takeLatest(UPDATE_TRANSACTION, updateTransaction)
];



export function* initialize() {
    try {
        console.log(`[dayTransactions][saga][initialize]`, arrayData);
        const transactions = yield call(FirebaseService.getTransactions);
        yield put(dayTransactionAction.setDayTransactions(transactions));
        yield call(calculateBalance);
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
            const data = yield call(FirebaseService.addToCollection, 'transactions', action.value);
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
            yield call(FirebaseService.updateDocumentInCollection, 'transactions', action.value);
            yield call(calculateBalance);
        }
    } catch (e) {
        console.log(`[error][day-transaction][saga][updateTransaction]>>> ${e}`);
    }
}


const arrayData = [
    {
        id: '0',
        value: 234,
        account: 'Cash',
        image: 'CASH',
        type: 'Food',
        description: 'Example for a description that will be add by the user',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '1',
        value: 67,
        account: 'CREDIT',
        image: 'CREDIT',
        type: 'Food',
        description: 'Example ',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '2',
        value: 8,
        account: 'CREDIT',
        image: 'CREDIT',
        type: 'Food',
        description: 'Example ',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '3',
        value: 12,
        account: 'Cash',
        image: 'CASH',
        type: 'Food',
        description: 'Example for a description that will be add by the user',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '4',
        value: 532,
        account: 'CREDIT',
        image: 'CREDIT',
        type: 'Food',
        description: 'Example ',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '5',
        value: 586,
        account: 'Cash',
        image: 'CASH',
        type: 'Food',
        description: 'Example for a description that will be add by the user',
        date: moment().format('DD-MM-YYYY').toString()
    },
]

