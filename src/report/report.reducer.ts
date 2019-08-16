import reportConstants from './report.constants';
import { AnyAction } from 'redux';
import { IReportState } from './report.model';
import appConstants from '../appConstants';

export const initialState: IReportState = {
    isInitialized: false

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

        default:
            return state
    }
}