import loginConstans from './login.constant';
import { ILoginAction } from './login.model';

const splashAction: ILoginAction = {
    loginInitializeStart() {
        return {
            type: loginConstans.LOGIN_INITIALIZE_START
        }
    },

    loginInitializeFinish() {
        return {
            type: loginConstans.LOGIN_INITIALIZE_FINISH
        }
    },

    loginSetPassword(password) {
        return {
            type: loginConstans.LOGIN_SET_PASSWORD,
            value: password
        }
    },

    loginSetUserName(userName) {
        return {
            type: loginConstans.LOGIN_SET_USERNAME,
            value: userName
        }
    },
    setFormMode(formMode, screenMode) {
        return {
            type: loginConstans.LOGIN_MODE,
            value: { formMode, screenMode }
        }
    },
    registerSubmit(userName, password) {
        return {
            type: loginConstans.REGISTER_SUBMIT,
            value: { userName, password }
        }
    },
    loginSubmit(userName, password) {
        return {
            type: loginConstans.LOGIN_SUBMIT,
            value: { userName, password }
        }
    },
    recoverPassword(userName) {
        return {
            type: loginConstans.RECOVER_PASSWORD,
            value: { userName }
        }
    },
    errorMessage(error) {
        return {
            type: loginConstans.ERROR_MESSAGE,
            value: error
        }
    },
    showSpinner(show) {
        return {
            type: loginConstans.SHOW_SPINNER,
            value: show
        }
    },
    loginSetCurrentLanguage(uLanguage: string) {
        return {
            type: loginConstans.LOGIN_SET_CURRENT_LANGUAGE,
            value: uLanguage
        }
    }
}

export default splashAction;