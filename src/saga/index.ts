import { all } from 'redux-saga/effects';
import splashSaga from '../splash/splash.saga';
import loginSaga from '../login/login.saga';

export default function* rootSaga() {
    yield all([
        ...splashSaga,
        ...loginSaga
    ]);
}
