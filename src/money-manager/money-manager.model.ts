import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface IMoneyManagerProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: IMoneyManagerState;
    actions?: IMoneyManagerAction;
}

export interface IMoneyManagerAction {
    moneyManagerInitializeStart?: () => Action;
    moneyManagerInitializeFinish?: () => Action;
    moneyManagerTabModeChange?: (tabMode: string) => Action;
    moneyManagerShowSpinner?: () => Action;
    moneyManagerHideSpinner?: () => Action;
    moneyManagerSetLocale?: (locale: string) => Action;
    moneyManagerShowInterstitialAd?: () => Action;
}

export interface IMoneyManagerState {
    isInitialized?: boolean;
    tabMode?: string;
    showSpinner?: boolean;
    locale?: string;
}
