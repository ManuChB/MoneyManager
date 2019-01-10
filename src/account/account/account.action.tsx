import { ACCOUNT_INITIALIZE_FINISH, ACCOUNT_INITIALIZE_START } from './account.constant';
import { IAccountAction } from './account.model';

const splashAction: IAccountAction = {
    accountInitializeStart() {
        console.log(`[account][action][initializeStart]`);
        return {
            type: ACCOUNT_INITIALIZE_FINISH
        }
    },

    accountInitializeFinish() {
        console.log(`[account][action][initializeFinish]`);
        return {
            type: ACCOUNT_INITIALIZE_START
        }
    }

}

export default splashAction;