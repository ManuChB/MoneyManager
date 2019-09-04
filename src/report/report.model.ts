import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { Moment }  from 'moment';

export interface IReportProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IReportState;
    actions?: IReportAction;
}

export interface IReportAction {
    reportInitializeStart?: () => Action;
    reportInitializeFinish?: () => Action;
    changeReportMode?: (mode: string) => Action;
    reportChangeDate?: (dateStart: Moment, dateEnd: Moment) => Action;
    reportSetTransactions?: (transactions: Array<any>) => Action;
    reportSetStadistics?: (stadistics: Array<any>) => Action;
    reportSetSelectedSlice?: (slice: string) => Action;
    reportSetTotals?: (totalIncome: number, tatalExpense: number) => Action;
    reportSetUCurrency?: (currencyName: string) => Action;
}

export interface IReportState {
    isInitialized?: boolean;
    reportMode?: string;
    dateStart?: Moment;
    dateEnd?: Moment;
    stadistics?: Array<any>;
    transactions?: Array<any>;
    selectedSlice?: string;
    totalIncome?: number;
    totalExpense?: number;
    uCurrency?: string;
}
