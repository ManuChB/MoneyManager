import { put, takeLatest, call } from 'redux-saga/effects';
import settingsAction from './settings.action';
import settingsConstants from './settings.constants';
import NavigationService from '../shared/service/navigation/navigation.service';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import appConstants from '../appConstants';

export default [
    takeLatest(settingsConstants.SETTINGS_INITIALIZE_START, initialize),
    takeLatest(settingsConstants.SETTINGS_SET_CURRENT_LANGUAGE, updateLanguage)
];

export function* initialize() {
    try {
        const uLanguage = yield call(AsyncStorageService.getItem, 'USER_LANGUAGE');
        yield put(settingsAction.settingsSetCurrentLanguage(uLanguage));
        yield put(settingsAction.settingsInitializeFinish());
    } catch (e) {
        console.log(`[error][settings][saga][initialize]>>> ${e}`);
    }
}

export function* updateLanguage(action) {
    try {
        yield call(AsyncStorageService.setItem, 'USER_LANGUAGE', action.value);
    } catch (e) {
        console.log(`[error][settings][saga][initialize]>>> ${e}`);
    }
}


