import { LOGIN_INITIALIZE_START, LOGIN_INITIALIZE_FINISH, LOGIN_SET_PASSWORD, LOGIN_SET_USERNAME, LOGIN_MODE, ERROR_MESSAGE, SHOW_SPINNER } from './login.constant';
import { AnyAction } from 'redux';
import { ILoginState } from './login.model';
import appConstants from '../appConstants';

export const initialState: ILoginState = {
    isInitialized: false,
    userName: '',
    password: '',
    formMode: appConstants.loginMode.register,
    errorMessage: '',
    screenMode: {
        buttonLabel: '',
        buttonOnPress: null,
        leftTextOnPress: null,
        leftTextLabel: '',
        rightTextOnPress: null,
        rightTextLabel: null
    },
    showSpinner: false
};

export default function login(state: ILoginState = initialState, action: AnyAction) {
    switch (action.type) {
        case LOGIN_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case LOGIN_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case LOGIN_SET_PASSWORD:
            return {
                ...state,
                password: action.value
            };
        case LOGIN_SET_USERNAME:
            return {
                ...state,
                userName: action.value
            };
        case LOGIN_MODE:
            return {
                ...state,
                formMode: action.value.formMode,
                screenMode: action.value.screenMode
            };
        case ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.value
            };
        case SHOW_SPINNER:
            return {
                ...state,
                showSpinner: action.value
            };
        default:
            return state
    }
}