import { put, takeLatest, call } from 'redux-saga/effects';
import dayTransactionAction from './new-transaction-modal.action';
import { NEW_TRANSACTION_INITIALIZE_START } from './new-transaction-modal.constant';
import asyncStorageService from '../../../shared/service/async-storage/async-storage.service';
import FirebaseService from '../../../shared/service/firebase/firebase.service';
import appConstants from '../../../appConstants';

export default [
    takeLatest(NEW_TRANSACTION_INITIALIZE_START, initialize),

];

export function* initialize() {
    try {
        const categories = yield call(asyncStorageService.getItem, appConstants.asyncStorageItem.CATEGORIES);
        const accounts = yield call(FirebaseService.getAllFromCollection, appConstants.collection.accounts);

        const accountList = accounts.map(element => {
            return ({ ...element.data, id: element.id })
        });

        console.log(`[newTransactions][saga][initialize]`, accounts);
        yield put(dayTransactionAction.setAccounts(accounts));
        yield put(dayTransactionAction.setCategories(categories));
    } 
    catch(e) {
        console.log(`[error][new-transaction][saga][initialize]>>> ${e}`);
    }
}
      