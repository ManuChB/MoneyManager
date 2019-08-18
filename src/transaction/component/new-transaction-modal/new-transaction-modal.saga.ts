import { put, takeLatest, call } from 'redux-saga/effects';
import dayTransactionAction from './new-transaction-modal.action';
import { NEW_TRANSACTION_INITIALIZE_START } from './new-transaction-modal.constant';
import AsyncStorageSevice from '../../../shared/service/async-storage/async-storage.service';
import FirebaseService from '../../../shared/service/firebase/firebase.service';
import appConstants from '../../../appConstants';
import AsyncStorageService from '../../../shared/service/async-storage/async-storage.service';

export default [
    takeLatest(NEW_TRANSACTION_INITIALIZE_START, initialize),

];

export function* initialize() {
    try {
        const uid = yield call(AsyncStorageService.getItem, 'USER_ID');
        const categories = yield call(AsyncStorageSevice.getItem, appConstants.asyncStorageItem.CATEGORIES);
        const accounts = yield call(FirebaseService.getAllFromCollectionWhithUid, appConstants.collection.accounts, uid);
        
        const accountList = accounts.map(element => {
            return ({ ...element.data, id: element.id })
        });

        yield put(dayTransactionAction.setAccounts(accounts));
        yield put(dayTransactionAction.setCategories(categories));
    } 
    catch(e) {
        console.log(`[error][new-transaction][saga][initialize]>>> ${e}`);
    }
}
      