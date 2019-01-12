import { MONEY_MANAGER_INITIALIZE_START, MONEY_MANAGER_INITIALIZE_FINISH, MONEY_MANAGER_TAB_MODE_CHANGE } from './money-manager.constant';
import { AnyAction } from 'redux';
import { IMoneyManagerState } from './money-manager.model';
import appConstans from '../appConstants';

export const initialState: IMoneyManagerState = {
    isInitialized: false,
    tabMode: appConstans.tabMode.account
};

export default function moneyManager(state: IMoneyManagerState = initialState, action: AnyAction) {
    switch (action.type) {
        case MONEY_MANAGER_INITIALIZE_START:
            console.log(`[moneyManager][reducer][MONEY_MANAGER_INITIALIZE_START]`);
            return {
                ...state,
                isInitialized: false
            };
        case MONEY_MANAGER_INITIALIZE_FINISH:
            console.log(`[moneyManager][reducer][MONEY_MANAGER_INITIALIZE_FINISH]`);
            return {
                ...state,
                isInitialized: true
            };
        case MONEY_MANAGER_TAB_MODE_CHANGE:
            console.log(`[moneyManager][reducer][MONEY_MANAGER_TAB_MODE_CHANGE]`);
            return {
                ...state,
                tabMode: action.value
            };
        default:
            console.log(`[moneyManager][reducer][default]`, state);

            return state
    }
}