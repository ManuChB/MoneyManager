import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface ISplashProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ISplashState;
    actions?: ISplashAction;
}

export interface ISplashAction {
    initializeStart?: () => Action;
    initializeFinish?: () => Action;
}

export interface ISplashState {
    isInitialized?: boolean;
}