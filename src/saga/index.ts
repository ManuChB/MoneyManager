import { all } from 'redux-saga/effects';
import splashSaga from '../splash/splash.saga';
import loginSaga from '../login/login.saga';
import dayTransactionSaga from '../transaction/component/day-transaction/day-transaction.saga';

export default function* rootSaga() {
    yield all([
        ...splashSaga,
        ...loginSaga,
        ...dayTransactionSaga
    ]);
}
