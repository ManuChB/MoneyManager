import moneyManagerConstans from './money-manager.constant';
import { IMoneyManagerAction } from './money-manager.model';

const moneyManagerAction: IMoneyManagerAction = {
    moneyManagerInitializeStart() {
        return {
            type: moneyManagerConstans.MONEY_MANAGER_INITIALIZE_FINISH
        }
    },

    moneyManagerInitializeFinish() {
        return {
            type: moneyManagerConstans.MONEY_MANAGER_INITIALIZE_START
        }
    },

    moneyManagerTabModeChange(tabMode) {
        return {
            type: moneyManagerConstans.MONEY_MANAGER_TAB_MODE_CHANGE,
            value: tabMode
        }
    },

    moneyManagerShowSpinner() {
        return {
            type: moneyManagerConstans.MONEY_MANAGER_SHOW_SPINNER
        }
    },

    moneyManagerHideSpinner() {
        return {
            type: moneyManagerConstans.MONEY_MANAGER_HIDE_SPINNER
        }
    }

}

export default moneyManagerAction;