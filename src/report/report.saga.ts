import { put, takeLatest, call, select } from 'redux-saga/effects';
import reportAction from './report.action';
import reportConstants from './report.constants';
import NavigationService from '../shared/service/navigation/navigation.service';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import appConstants from '../appConstants';
import moneyManagerAction from '../money-manager/money-manager.action';
import TransactionsService from '../shared/service/transactions/transactions.service';
import * as selectors from './selectors';

export default [
    takeLatest(reportConstants.REPORT_INITIALIZE_START, initialize),
    takeLatest(reportConstants.REPORT_CHANGE_DATE, getTransactions)
];

export function* initialize() {
    try {
        yield put(reportAction.reportInitializeFinish());
        yield call(getTransactions);
    } catch (e) {
        console.log(`[error][report][saga][initialize]>>> ${e}`);
    }
}

export function* getTransactions() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        const startDate = yield select(selectors.getReportStartDate);
        const endDate = yield select(selectors.getReportEndDate);

        yield call(TransactionsService.getTransactionByDateRange, startDate, endDate);
        const tByCategory = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.TRANSACTIONS_BY_CATEGORY);
        yield put(reportAction.reportSetTransactions(tByCategory));
        const stadisticsData = yield call(calculateStadistics, tByCategory);
        yield put(reportAction.reportSetStadistics(stadisticsData));

        const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
        yield put(reportAction.reportSetUCurrency(uCurrency.name));

        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][report][saga][getTransactions]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function* calculateStadistics(tByCategory) {
    var data = [];
    var totalExpense = 0;
    var totalIncome = 0;

    if (tByCategory.length > 0) {
        tByCategory.forEach(e => {
            const elem = {
                id: e.category.id, name: e.category.name, 
                income: e.balance.income, expense: e.balance.expense,
                percentTotalIncome:0, percentTotalExpense: 0
            }
            data.push(elem);
            totalIncome +=e.balance.income;
            totalExpense += e.balance.expense;
        });
        data.forEach(e => {
            e.percentTotalIncome = Math.round((e.income / totalIncome)*100);
            e.percentTotalExpense = Math.round((e.expense / totalExpense) * 100);
        });
    }
    yield put(reportAction.reportSetTotals(totalIncome, totalExpense));
    return data;
}
