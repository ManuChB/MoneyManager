import { put, takeLatest, call } from 'redux-saga/effects';
import splashAction from './splash.action';
import { INITIALIZE_START } from './splash.constant';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageSevice from '../shared/service/async-storage/async-storage.service';
//import LocalStorageService from '../shared/service/local-storage/local-storage.service';

export default [
    takeLatest(INITIALIZE_START, initialize)
];


export function* initialize() {
    try {
        console.log(`[splash][saga][initialize]`);
        // yield call(LocalStorageService.initStorage);
        // yield call(LocalStorageService.insert, 'data');
        // yield call(LocalStorageService.get);
        yield call(FirebaseService.init);
        //yield call(FirebaseService.writeUserData, 'email0', 'fname', 'adfsadf');

        const uid = yield call(AsyncStorageSevice.getItem, 'USER_ID');
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
