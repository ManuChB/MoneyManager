import { put, takeLatest, call, all } from 'redux-saga/effects';
import splashAction from './splash.action';
import { INITIALIZE_START } from './splash.constant';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageSevice from '../shared/service/async-storage/async-storage.service';

export default [
    takeLatest(INITIALIZE_START, initialize)
];


export function* initialize() {
    try {
        console.log(`[splash][saga][initialize]`);
        yield call(FirebaseService.init);
        const uid = yield call(AsyncStorageSevice.getItem, 'USER_ID');
        yield call(getEsentialData);
        if( true) {
            yield call(NavigationService.navigateTo, appConstants.routName.moneyManager);
        }
        else {
            yield call(NavigationService.navigateTo, appConstants.routName.login);
        }
        yield put(splashAction.initializeFinish());
    } catch (e) {
        console.log(`[error][splash][saga][initialize]>>> ${e}`);
    }
}

function* getEsentialData() {
    console.log(`[splash][saga][getEsentialData]`);

    const { categories, currencies, accountTypes } = yield all([
        call(FirebaseService.getAllFromCollection, appConstants.collection.categories),
        call(FirebaseService.getAllFromCollection, appConstants.collection.currency),
        call(FirebaseService.getAllFromCollection, appConstants.collection.accountTypes)
    ]);
    yield all([
        call(AsyncStorageSevice.setItem, appConstants.asyncStorageItem.CATEGORIES, categories),
        call(AsyncStorageSevice.setItem, appConstants.asyncStorageItem.CURRENCIES, currencies),
        call(AsyncStorageSevice.setItem, appConstants.asyncStorageItem.ACCOUNT_TYPES, accountTypes)
    ]);

}
