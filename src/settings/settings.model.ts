import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface ISettingsProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ISettingsState;
    actions?: ISettingsAction;
    dispatch?: any;
}

export interface ISettingsAction {
    settingsInitializeStart?: () => Action;
    settingsInitializeFinish?: () => Action;
    settingsSetCurrentLanguage?: (uLanguage: string) => Action;
}

export interface ISettingsState {
    isInitialized?: boolean;
    currentLanguage?: {
        name: string;
        code: string;
    }
}

export interface IScreenModeState {

}