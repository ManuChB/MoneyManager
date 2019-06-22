import { LOGIN_INITIALIZE_FINISH, LOGIN_INITIALIZE_START, LOGIN_SET_PASSWORD, LOGIN_SET_USERNAME, LOGIN_MODE,
    REGISTER_SUBMIT, LOGIN_SUBMIT, ERROR_MESSAGE, SHOW_SPINNER } from './login.constant';
import { ILoginAction } from './login.model';

const splashAction: ILoginAction = {
    loginInitializeStart() {
        return {
            type: LOGIN_INITIALIZE_START
        }
    },

    loginInitializeFinish() {
        return {
            type: LOGIN_INITIALIZE_FINISH
        }
    },

    loginSetPassword(password) {
        return {
            type: LOGIN_SET_PASSWORD,
            value: password
        }
    },

    loginSetUserName(userName) {
        return {
            type: LOGIN_SET_USERNAME,
            value: userName
        }
    },
    setFormMode(formMode, screenMode) {
        return {
            type: LOGIN_MODE,
            value: { formMode, screenMode }
        }
    },
    registerSubmit(userName, password) {
        return {
            type: REGISTER_SUBMIT,
            value: { userName, password }
        }
    },
    loginSubmit(userName, password) {
        return {
            type: LOGIN_SUBMIT,
            value: { userName, password }
        }
    },
    errorMessage(error) {
        return {
            type: ERROR_MESSAGE,
            value: error
        }
    },
    showSpinner(show) {
        return {
            type: SHOW_SPINNER,
            value: show
        }
    }
}

export default splashAction;