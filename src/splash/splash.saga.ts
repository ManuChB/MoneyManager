import { put, takeLatest, call, all } from 'redux-saga/effects';
import splashAction from './splash.action';
import { INITIALIZE_START } from './splash.constant';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';

export default [
    takeLatest(INITIALIZE_START, initialize)
];


export function* initialize() {
    try {
        console.log(`[splash][saga][initialize]`);
        yield call(FirebaseService.init);
        const uid = yield call(AsyncStorageService.getItem, 'USER_ID');
        yield call(getEsentialData);
        if(uid) {
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

    const cat = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.CATEGORIES);
    const cur = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.CURRENCIES);
    const acc = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.ACCOUNT_TYPES);
    if(!cat  || !cur || !acc){ 
        const categories = yield call(FirebaseService.getAllFromCollection, appConstants.collection.categories);
        const currencies = yield call(FirebaseService.getAllFromCollection, appConstants.collection.currency);
        const accountTypes = yield call(FirebaseService.getAllFromCollection, appConstants.collection.accountTypes);
        console.log('--------------categories-------', categories)
        console.log('--------------currencies-------', currencies)
        console.log('--------------accountTypes-------', accountTypes)

        yield all([
            call(AsyncStorageService.setItem, appConstants.asyncStorageItem.CATEGORIES, categories),
            call(AsyncStorageService.setItem, appConstants.asyncStorageItem.CURRENCIES, currencies),
            call(AsyncStorageService.setItem, appConstants.asyncStorageItem.ACCOUNT_TYPES, accountTypes)
        ]);
    }
}

