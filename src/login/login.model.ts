import { Action } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface ILoginProp {
    navigation?: NavigationScreenProp<any, any>;
    state?: ILoginState;
    actions?: ILoginAction;
}

export interface ILoginAction {
    loginInitializeStart?: () => Action;
    loginInitializeFinish?: () => Action;
    loginSetUserName?: (userName: string) => Action;
    loginSetPassword?: (password: string) => Action;
    setFormMode?: (formMode: string, screenMode: object) => Action;
    registerSubmit?: (userName: string, password: string) => Action;
    loginSubmit?: (userName: string, password: string) => Action;
    errorMessage?: (message: string) => Action;
    showSpinner?: (show: boolean) => Action;
}

export interface ILoginState {
    isInitialized?: boolean;
    userName?: string;
    password?: string;
    formMode?: string;
    errorMessage?: string;
    screenMode?: IScreenModeState;
    showSpinner?: boolean;
}

export interface IScreenModeState {
    buttonLabel?: string,
    buttonOnPress?: () => void,
    leftTextOnPress?: () => void,
    leftTextLabel?: string,
    rightTextOnPress?: () => void,
    rightTextLabel?: string
}