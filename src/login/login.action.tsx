import { LOGIN_INITIALIZE_FINISH, LOGIN_INITIALIZE_START, LOGIN_SET_PASSWORD, LOGIN_SET_USERNAME, LOGIN_MODE, REGISTER_SUBMIT, LOGIN_SUBMIT, ERROR_MESSAGE } from './login.constant';
import { ILoginAction } from './login.model';

const splashAction: ILoginAction = {
    loginInitializeStart() {
        console.log(`[login][action][initializeStart]`);
        return {
            type: LOGIN_INITIALIZE_FINISH
        }
    },

    loginInitializeFinish() {
        console.log(`[login][action][initializeFinish]`);
        return {
            type: LOGIN_INITIALIZE_START
        }
    },

    loginSetPassword(password) {
        console.log(`[login][action][loginSetPassword]`);
        return {
            type: LOGIN_SET_PASSWORD,
            value: password
        }
    },

    loginSetUserName(userName) {
        console.log(`[login][action][loginSetUserName]`);
        return {
            type: LOGIN_SET_USERNAME,
            value: userName
        }
    },
    setFormMode(formMode) {
        console.log(`[login][action][setFormMode]`);
        return {
            type: LOGIN_MODE,
            value: formMode
        }
    },
    registerSubmit(userName, password) {
        console.log(`[login][action][registerSubmit]`);
        return {
            type: REGISTER_SUBMIT,
            value: { userName, password }
        }
    },
    loginSubmit(userName, password) {
        console.log(`[login][action][loginSubmit]`);
        return {
            type: LOGIN_SUBMIT,
            value: { userName, password }
        }
    },
    errorMessage(error) {
        console.log(`[login][action][errorMessage]`);
        return {
            type: ERROR_MESSAGE,
            value: error
        }
    }
}

export default splashAction;