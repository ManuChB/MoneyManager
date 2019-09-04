import reportConstants from './report.constants';
import { AnyAction } from 'redux';
import { IReportState } from './report.model';
import appConstants from '../appConstants';
import moment from 'moment';

export const initialState: IReportState = {
    isInitialized: false,
    reportMode: appConstants.reportMode.expenses,
    dateStart: moment().startOf('month'),
    dateEnd: moment().endOf('month'),
    transactions: [],
    stadistics: [],
    selectedSlice: '',
    totalExpense: 0,
    totalIncome: 0,
    uCurrency: null

};

export default function report(state: IReportState = initialState, action: AnyAction) {
    switch (action.type) {
        case reportConstants.REPORT_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case reportConstants.REPORT_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case reportConstants.CHANGE_REPORT_MODE:
            return {
                ...state,
                reportMode: action.value
            };
        case reportConstants.REPORT_CHANGE_DATE:
            return {
                ...state,
                dateStart: action.value.dateStart,
                dateEnd: action.value.dateEnd
            };
        case reportConstants.REPORT_SET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.value
            };
        case reportConstants.REPORT_SET_SELECTED_SLICE:
            return {
                ...state,
                selectedSlice: action.value
            };
        case reportConstants.REPORT_SET_ESTADISTICS:
            return {
                ...state,
                stadistics: action.value
            };
        case reportConstants.REPORT_SET_TOTALS:
            return {
                ...state,
                totalIncome: action.value.totalIncome,
                totalExpense: action.value.totalExpense
            };
        case reportConstants.REPORT_SET_USER_CURRENCY:
            return {
                ...state,
                uCurrency: action.value
            };

            
        default:
            return state
    }
}