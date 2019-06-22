import { MONEY_MANAGER_INITIALIZE_FINISH, MONEY_MANAGER_INITIALIZE_START, MONEY_MANAGER_TAB_MODE_CHANGE } from './money-manager.constant';
import { IMoneyManagerAction } from './money-manager.model';

const moneyManagerAction: IMoneyManagerAction = {
    moneyManagerInitializeStart() {
        return {
            type: MONEY_MANAGER_INITIALIZE_FINISH
        }
    },

    moneyManagerInitializeFinish() {
        return {
            type: MONEY_MANAGER_INITIALIZE_START
        }
    },

    moneyManagerTabModeChange(tabMode) {
        return {
            type: MONEY_MANAGER_TAB_MODE_CHANGE,
            value: tabMode
        }
    }

}

export default moneyManagerAction;