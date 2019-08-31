import { put, takeLatest, call } from 'redux-saga/effects';
import dayTransactionAction from './new-transaction-modal.action';
import { NEW_TRANSACTION_INITIALIZE_START } from './new-transaction-modal.constant';
import appConstants from '../../../appConstants';
import sqLiteService from '../../../shared/service/sqLite/sqLite.service';

export default [
    takeLatest(NEW_TRANSACTION_INITIALIZE_START, initialize),

];

export function* initialize() {
    try {
        const accounts = yield call(sqLiteService.getAllAccounts);
        const categories = yield call(sqLiteService.getAllCategories);
        const icons = yield call(sqLiteService.getAllFrom, appConstants.sqliteTable.imageIcon);

        yield put(dayTransactionAction.setAccounts(accounts));
        yield put(dayTransactionAction.setCategories(categories));
        yield put(dayTransactionAction.setIcons(icons));

    } 
    catch(e) {
        console.log(`[error][new-transaction][saga][initialize]>>> ${e}`);
    }
}
      