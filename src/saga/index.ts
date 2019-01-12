import { all } from 'redux-saga/effects';
import splashSaga from '../splash/splash.saga';
import loginSaga from '../login/login.saga';
import dayTransactionSaga from '../transaction/component/day-transaction/day-transaction.saga';
import newTransactionSaga from '../transaction/component/new-transaction-modal/new-transaction-modal.saga';
import accountListSaga from '../account/account-list.saga';
import accountDetailSaga from '../account/account-detail/account-detail.saga';

export default function* rootSaga() {
    yield all([
        ...splashSaga,
        ...loginSaga,
        ...dayTransactionSaga,
        ...newTransactionSaga,
        ...accountListSaga,
        ...accountDetailSaga
    ]);
}
