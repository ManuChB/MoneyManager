import { put, takeLatest, call, select } from 'redux-saga/effects';

import accountListAction from './account-list.action';
import {
    ACCOUNT_LIST_INITIALIZE_START, SET_ACCOUNT_TO_DETAIL, SAVE_NEW_ACCOUNT
} from './account-list.constant';
import FirebaseService from '../shared/service/firebase/firebase.service';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import * as selectors from './selectors';
import TransactionsService from '../shared/service/transactions/transactions.service';

export default [
    takeLatest(ACCOUNT_LIST_INITIALIZE_START, initialize),
    takeLatest(SET_ACCOUNT_TO_DETAIL, accountToDetail),
    takeLatest(SAVE_NEW_ACCOUNT, saveNewAccount)
];



export function* initialize() {
    try {
        yield call(getAccounts);
        yield put(accountListAction.accountListInitializeFinish());
    } catch (e) {
        console.log(`[error][accountList][saga][initialize]>>> ${e}`);
    }
}

export function* getAccounts() {
    try {
        const uid = yield call(AsyncStorageService.getItem, 'USER_ID');
        const accounts = yield call(FirebaseService.getAllFromCollectionWhithUid, appConstants.collection.accounts, uid);
        const accountList = accounts.map(element => {
            return element;
        });
        yield put(accountListAction.setAccounts(accountList));
        yield call(calculateBalance);
    } catch (e) {
        console.log(`[error][accountList][saga][getAccounts]>>> ${e}`);
    }
}

export function* accountToDetail(action) {
    try {
        yield call(NavigationService.navigateTo, appConstants.routName.accountDetail,
            {
                account: action.value.account,
                onClose: NavigationService.navigateBack,
                onSave: action.value.onSave
            }
        );
    } catch (e) {
        console.log(`[error][accountList][saga][accountToDetail]>>> ${e}`);
    }
}

export function* saveNewAccount(action) {
    try {
        if (action.value.id.includes(appConstants.localId.account)) {
            const uid = yield call(AsyncStorageService.getItem, 'USER_ID');
            const data = yield call(FirebaseService.addToCollection, appConstants.collection.accounts, action.value);
            if (data.id) {
                yield put(accountListAction.saveNewAccount({ ...action.value, id: data.id, uuid: uid }));
            }
        } else {
            yield call(updateAccount, action);
        }
        yield call(getAccounts);
    } catch (e) {
        console.log(`[error][accountList][saga][saveNewAccount]>>> ${e}`);
    }
}


export function* updateAccount(action) {
    try {
        if (action.value.id.includes(appConstants.localId.account)) {
            yield call(saveNewAccount, action);
        } else {
            yield call(FirebaseService.updateDocumentInCollection, appConstants.collection.accounts, action.value);
            yield call(initialize);
        }
    } catch (e) {
        console.log(`[error][accountList][saga][updateAccount]>>> ${e}`);
    }
}

export function* calculateBalance() {
    try {
        const accounts = yield select(selectors.getAccounts);
        const { income, expense, balance } = TransactionsService.calculateBalance(accounts);
        yield put(accountListAction.setBalanceInfo(income, expense, balance))
    } catch (e) {
        console.log(`[error][day-transaction][saga][calculateBalance]>>> ${e}`);
    }
}