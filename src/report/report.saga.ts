import { put, takeLatest, call } from 'redux-saga/effects';
import reportAction from './report.action';
import reportConstants from './report.constants';
import NavigationService from '../shared/service/navigation/navigation.service';
import FirebaseService from '../shared/service/firebase/firebase.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import appConstants from '../appConstants';

export default [
    takeLatest(reportConstants.REPORT_INITIALIZE_START, initialize)
];

export function* initialize() {
    try {
        yield put(reportAction.reportInitializeFinish());
    } catch (e) {
        console.log(`[error][report][saga][initialize]>>> ${e}`);
    }
}


