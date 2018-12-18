import { INITIALIZE_FINISH, INITIALIZE_START } from  './splash.constant';
import { ISplashAction } from './splash.model';

const splashAction: ISplashAction = {
    initializeStart() {
        return {
            type: INITIALIZE_START
        }
    },

    initializeFinish() {
        return {
            type: INITIALIZE_FINISH
        }
    }
}

export default splashAction;