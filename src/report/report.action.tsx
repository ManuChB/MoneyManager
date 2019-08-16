import settinsConstans from './report.constants';
import { IReportAction } from './report.model';

const reportAction: IReportAction = {
    reportInitializeStart() {
        return {
            type: settinsConstans.REPORT_INITIALIZE_START
        }
    },

    reportInitializeFinish() {
        return {
            type: settinsConstans.REPORT_INITIALIZE_FINISH
        }
    },

    
}

export default reportAction;