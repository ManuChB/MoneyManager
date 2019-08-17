import { put, takeLatest, call } from 'redux-saga/effects';

import accountListAction from './account-list.action';
import {
    ACCOUNT_LIST_INITIALIZE_START, SET_ACCOUNT_TO_DETAIL, SAVE_NEW_ACCOUNT
} from './account-list.constant';
import FirebaseService from '../shared/service/firebase/firebase.service';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';

export default [
    takeLatest(ACCOUNT_LIST_INITIALIZE_START, initialize),
    takeLatest(SET_ACCOUNT_TO_DETAIL, accountToDetail),
    takeLatest(SAVE_NEW_ACCOUNT, saveNewAccount)
];



export function* initialize() {
    try {
        const accounts = yield call(FirebaseService.getAllFromCollection, appConstants.collection.accounts);
        const accountList = accounts.map(element => {
            return element;
        });

        yield put(accountListAction.setAccounts(accountList));
        yield put(accountListAction.accountListInitializeFinish());
    } catch (e) {
        console.log(`[error][accountList][saga][initialize]>>> ${e}`);
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
            const data = yield call(FirebaseService.addToCollection, appConstants.collection.accounts, action.value);
            if (data.id) {
                yield put(accountListAction.saveNewAccount({ ...action.value, id: data.id }))
            }
        } else {
            yield call(updateAccount, action);
        }
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