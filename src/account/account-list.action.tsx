import { ACCOUNT_LIST_INITIALIZE_FINISH, ACCOUNT_LIST_INITIALIZE_START } from './account-list.constant';
import { IAccountListAction } from './account-list.model';

const splashAction: IAccountListAction = {
    accountListInitializeStart() {
        console.log(`[account][action][initializeStart]`);
        return {
            type: ACCOUNT_LIST_INITIALIZE_FINISH
        }
    },

    accountListInitializeFinish() {
        console.log(`[account][action][initializeFinish]`);
        return {
            type: ACCOUNT_LIST_INITIALIZE_START
        }
    }

}

export default splashAction;