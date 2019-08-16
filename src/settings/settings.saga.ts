import { put, takeLatest, call } from 'redux-saga/effects';
import settingsAction from './settings.action';
import settingsConstants from './settings.constants';
import NavigationService from '../shared/service/navigation/navigation.service';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import appConstants from '../appConstants';

export default [
    takeLatest(settingsConstants.SETTINGS_INITIALIZE_START, initialize)
];

export function* initialize() {
    try {
        yield put(settingsAction.settingsInitializeFinish());
    } catch (e) {
        console.log(`[error][settings][saga][initialize]>>> ${e}`);
    }
}


