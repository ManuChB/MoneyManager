import { LOGIN_INITIALIZE_START, LOGIN_INITIALIZE_FINISH, LOGIN_SET_PASSWORD, LOGIN_SET_USERNAME, LOGIN_MODE, ERROR_MESSAGE } from './login.constant';
import { AnyAction } from 'redux';
import { ILoginState } from './login.model';
import appConstans from '../appConstants';

export const initialState: ILoginState = {
    isInitialized: false,
    userName: '',
    password: '',
    formMode: appConstans.loginMode.register,
    errorMessage: '',
    screenMode: {
        buttonLabel: '',
        buttonOnPress: null,
        leftTextOnPress: null,
        leftTextLabel: '',
        rightTextOnPress: null,
        rightTextLabel: null}
};

export default function login(state: ILoginState = initialState, action: AnyAction) {
    switch (action.type) {
        case LOGIN_INITIALIZE_START:
            console.log(`[login][reducer][initializeStart]`);
            return {
                ...state,
                isInitialized: false
            };
        case LOGIN_INITIALIZE_FINISH:
            console.log(`[login][reducer][initializeFinish]`);
            return {
                isInitialized: true
            };
        case LOGIN_SET_PASSWORD:
            console.log(`[login][reducer][LOGIN_SET_PASSWORD]`);
            return {
                ...state,
                password: action.value
            };
        case LOGIN_SET_USERNAME:
            console.log(`[login][reducer][LOGIN_SET_USERNAME]`);
            return {
                ...state,
                userName: action.value
            };
        case LOGIN_MODE:
            console.log(`[login][reducer][LOGIN_MODE]`);
            return {
                ...state,
                formMode: action.value.formMode,
                screenMode: action.value.screenMode
            };
        case ERROR_MESSAGE:
            console.log(`[login][reducer][ERROR_MESSAGE]`, action.value);
            return {
                ...state,
                errorMessage: action.value
            };
        default:
            return state
    }
}