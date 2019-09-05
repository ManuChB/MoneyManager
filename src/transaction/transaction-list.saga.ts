import { put, takeLatest, call, select } from 'redux-saga/effects';
import transactionListConstants from './transaction-list.constant';
import TransactionsService from '../shared/service/transactions/transactions.service';



export default [
    takeLatest(transactionListConstants.SET_TRANSACTION_TO_DETAIL, transactionToDetail),
];



export function* transactionToDetail(action) {
    try {
        yield call(TransactionsService.transactionToDetail, action.value.transaction, action.value.getTransactions);
    } catch (e) {
        console.log(`[error][day-transaction][saga][transactionToDetail]>>> ${e}`);
    }
}
