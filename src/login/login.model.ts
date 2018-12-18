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
    setFormMode?: (formMode: string) => Action;
    registerSubmit?: (userName: string, password: string) => Action;
    loginSubmit?: (userName: string, password: string) => Action;
    errorMessage?: (message: string) => Action;

}

export interface ILoginState {
    isInitialized?: boolean;
    userName?: string;
    password?: string;
    formMode?: string;
    errorMessage?: string;
}