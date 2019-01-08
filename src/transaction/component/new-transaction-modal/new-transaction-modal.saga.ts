import { put, takeLatest, call } from 'redux-saga/effects';
import dayTransactionAction from './new-transaction-modal.action';
import { NEW_TRANSACTION_INITIALIZE_START } from './new-transaction-modal.constant';
import asyncStorageService from '../../../shared/service/async-storage/async-storage.service';

export default [
    takeLatest(NEW_TRANSACTION_INITIALIZE_START, initialize),

];

export function* initialize() {
    try {
        const categories = yield call(asyncStorageService.getItem, 'CATEGORIES');
        console.log(`[newTransactions][saga][initialize]`, categories);
        yield put(dayTransactionAction.setCategories(categories));
    } 
    catch(e) {
        console.log(`[error][new-transaction][saga][initialize]>>> ${e}`);
    }
}
      