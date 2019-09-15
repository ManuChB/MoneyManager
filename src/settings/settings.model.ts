import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { IMoneyManagerAction } from '../money-manager/money-manager.model';

export interface ISettingsProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ISettingsState;
    actions?: ISettingsAction & IMoneyManagerAction;
    dispatch?: any;
    setLanguage?: (locale: string) => void;
}

export interface ISettingsAction {
    settingsInitializeStart?: () => Action;
    settingsInitializeFinish?: () => Action;
    settingsSetCurrentLanguage?: (uLanguage: string) => Action;
    settingsSetCurrentCurrency?: (currency: string) => Action;
    settingsSetCurrencyList?: (currencyList: Array<any>) => Action;
    logOut?: () => Action;
}

export interface ISettingsState {
    isInitialized?: boolean;
    currentLanguage?: {
        name: string;
        code: string;
    },
    currency?: any;
    currencyList?: Array<any>;
}

export interface IScreenModeState {

}