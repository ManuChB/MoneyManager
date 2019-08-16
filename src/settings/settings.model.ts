import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface ISettingsProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ISettingsState;
    actions?: ISettingsAction;
}

export interface ISettingsAction {
    settingsInitializeStart?: () => Action;
    settingsInitializeFinish?: () => Action;
    
}

export interface ISettingsState {
    isInitialized?: boolean;

}

export interface IScreenModeState {

}