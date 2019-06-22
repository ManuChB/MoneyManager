import { MONEY_MANAGER_INITIALIZE_START, MONEY_MANAGER_INITIALIZE_FINISH, MONEY_MANAGER_TAB_MODE_CHANGE } from './money-manager.constant';
import { AnyAction } from 'redux';
import { IMoneyManagerState } from './money-manager.model';
import appConstants from '../appConstants';

export const initialState: IMoneyManagerState = {
    isInitialized: false,
    tabMode: appConstants.tabMode.transaction
};

export default function moneyManager(state: IMoneyManagerState = initialState, action: AnyAction) {
    switch (action.type) {
        case MONEY_MANAGER_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case MONEY_MANAGER_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case MONEY_MANAGER_TAB_MODE_CHANGE:
            return {
                ...state,
                tabMode: action.value
            };
        default:
            return state
    }
}