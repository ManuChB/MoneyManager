import moneyManagerConstants from './money-manager.constant';
import { AnyAction } from 'redux';
import { IMoneyManagerState } from './money-manager.model';
import appConstants from '../appConstants';

export const initialState: IMoneyManagerState = {
    isInitialized: false,
    tabMode: appConstants.tabMode.transaction,
    showSpinner: false
};

export default function moneyManager(state: IMoneyManagerState = initialState, action: AnyAction) {
    switch (action.type) {
        case moneyManagerConstants.MONEY_MANAGER_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case moneyManagerConstants.MONEY_MANAGER_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case moneyManagerConstants.MONEY_MANAGER_TAB_MODE_CHANGE:
            return {
                ...state,
                tabMode: action.value
            };
        case moneyManagerConstants.MONEY_MANAGER_SHOW_SPINNER:
            return {
                ...state,
                showSpinner: true
            };
        case moneyManagerConstants.MONEY_MANAGER_HIDE_SPINNER:
            return {
                ...state,
                showSpinner: false
            };
        default:
            return state
    }
}