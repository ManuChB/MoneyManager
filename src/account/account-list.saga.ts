import { put, takeLatest, call, select } from 'redux-saga/effects';

import accountListAction from './account-list.action';
import moneyManagerAction from '../money-manager/money-manager.action';

import accountListConstants from './account-list.constant';
import FirebaseService from '../shared/service/firebase/firebase.service';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import * as selectors from './selectors';
import AccountService from '../shared/service/account/account.service';

export default [
    takeLatest(accountListConstants.ACCOUNT_LIST_INITIALIZE_START, initialize),
    takeLatest(accountListConstants.SET_ACCOUNT_TO_DETAIL, accountToDetail),
    takeLatest(accountListConstants.SAVE_NEW_ACCOUNT, saveNewAccount)
];



export function* initialize() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        yield call(getAccounts);
        yield put(accountListAction.accountListInitializeFinish());
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][accountList][saga][initialize]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function* getAccounts() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        const accountList = yield call(AccountService.getAccounts);
        yield put(accountListAction.setAccounts(accountList));
        yield call(calculateBalance);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][accountList][saga][getAccounts]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
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
            yield call(AccountService.newAccount, action.value);
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
            AccountService.updateAccount(action.value);
            yield call(initialize);
        }
    } catch (e) {
        console.log(`[error][accountList][saga][updateAccount]>>> ${e}`);
    }
}

export function* calculateBalance() {
    try {
        const accounts = yield select(selectors.getAccounts);
        const { income, expense, balance } = AccountService.calculateBalance(accounts);
        yield put(accountListAction.setBalanceInfo(income, expense, balance))
    } catch (e) {
        console.log(`[error][accountList][saga][calculateBalance]>>> ${e}`);
    }
}