import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IReportProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IReportState;
    actions?: IReportAction;
}

export interface IReportAction {
    reportInitializeStart?: () => Action;
    reportInitializeFinish?: () => Action;
    
}

export interface IReportState {
    isInitialized?: boolean;

}

export interface IScreenModeState {

}