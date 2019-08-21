import { all } from 'redux-saga/effects';
import splashSaga from '../splash/splash.saga';
import loginSaga from '../login/login.saga';
import dayTransactionSaga from '../transaction/component/day-transaction/day-transaction.saga';
import newTransactionSaga from '../transaction/component/new-transaction-modal/new-transaction-modal.saga';
import accountListSaga from '../account/account-list.saga';
import accountDetailSaga from '../account/account-detail/account-detail.saga';
import weekTransactionSaga from '../transaction/component/week-transaction/week-transaction.saga';
import monthTransactionSaga from '../transaction/component/month-transaction/month-transaction.saga';
import settingsSaga from '../settings/settings.saga';
import reportSaga from '../report/report.saga';
import transactionListSaga from '../transaction/transaction-list.saga';
export default function* rootSaga() {
    yield all([
        ...splashSaga,
        ...loginSaga,
        ...dayTransactionSaga,
        ...newTransactionSaga,
        ...accountListSaga,
        ...accountDetailSaga,
        ...weekTransactionSaga,
        ...monthTransactionSaga,
        ...settingsSaga,
        ...reportSaga,
        ...transactionListSaga
    ]);
}
