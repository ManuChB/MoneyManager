import { put, takeLatest, call } from 'redux-saga/effects';

import accountDetailAction from './account-detail.action';
import accountDetailConstant from './account-detail.constant';
import appConstants from '../../appConstants';
import sqLiteService from '../../shared/service/sqLite/sqLite.service';

export default [
    takeLatest(accountDetailConstant.ACCOUNT_DETAIL_INITIALIZE_START, initialize)
];



export function* initialize() {
    try {
        const currencyList = yield call(sqLiteService.getAllFrom, appConstants.sqliteTable.currency);
        const accountTypeList = yield call(sqLiteService.getAllFrom, appConstants.sqliteTable.accountType);
        yield put(accountDetailAction.setPickersData(currencyList, accountTypeList));

        yield put(accountDetailAction.accountDetailInitializeFinish());
    } catch (e) {
        console.log(`[error][accountDetailAction][saga][initialize]>>> ${e}`);
    }
}

