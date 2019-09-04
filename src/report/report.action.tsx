import reportConstans from './report.constants';
import { IReportAction } from './report.model';
import { Moment } from 'moment';

const reportAction: IReportAction = {
    reportInitializeStart() {
        return {
            type: reportConstans.REPORT_INITIALIZE_START
        }
    },

    reportInitializeFinish() {
        return {
            type: reportConstans.REPORT_INITIALIZE_FINISH
        }
    },

    changeReportMode(mode: string) {
        return {
            type: reportConstans.CHANGE_REPORT_MODE,
            value: mode
        }
    },

    reportChangeDate(dateStart: Moment, dateEnd: Moment) {
        return {
            type: reportConstans.REPORT_CHANGE_DATE,
            value: { dateStart, dateEnd }
        }
    },

    reportSetTransactions(transactions: Array<any>) {
        return {
            type: reportConstans.REPORT_SET_TRANSACTIONS,
            value: transactions
        }
    },

    reportSetSelectedSlice(slice: string) {
        return {
            type: reportConstans.REPORT_SET_SELECTED_SLICE,
            value: slice
        }
    },

    reportSetStadistics(stadistics: Array<any>) {
        return {
            type: reportConstans.REPORT_SET_ESTADISTICS,
            value: stadistics
        }
    },

    reportSetTotals(totalIncome: number, totalExpense: number) {
        return {
            type: reportConstans.REPORT_SET_TOTALS,
            value: { totalIncome, totalExpense }
        }
    },

    reportSetUCurrency(uCurrency: string) {
        return {
            type: reportConstans.REPORT_SET_USER_CURRENCY,
            value: uCurrency
        }
    },

}

export default reportAction;