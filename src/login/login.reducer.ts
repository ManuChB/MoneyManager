import loginConstants from './login.constant';
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
    showSpinner: false,
    currentLanguage: {
        name: null,
        code: null
    }
};

export default function login(state: ILoginState = initialState, action: AnyAction) {
    switch (action.type) {
        case loginConstants.LOGIN_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case loginConstants.LOGIN_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case loginConstants.LOGIN_SET_PASSWORD:
            return {
                ...state,
                password: action.value
            };
        case loginConstants.LOGIN_SET_USERNAME:
            return {
                ...state,
                userName: action.value
            };
        case loginConstants.LOGIN_MODE:
            return {
                ...state,
                formMode: action.value.formMode,
                screenMode: action.value.screenMode
            };
        case loginConstants.ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.value
            };
        case loginConstants.SHOW_SPINNER:
            return {
                ...state,
                showSpinner: action.value
            };
        case loginConstants.LOGIN_SET_CURRENT_LANGUAGE:
            return {
                ...state,
                currentLanguage: action.value
            };

        default:
            return state
    }
}