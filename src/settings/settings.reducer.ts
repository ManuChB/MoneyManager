import settingsConstants from './settings.constants';
import { AnyAction } from 'redux';
import { ISettingsState } from './settings.model';
import appConstants from '../appConstants';

export const initialState: ISettingsState = {
    isInitialized: false,
    currentLanguage: {
        name: null,
        code: null
    }

};

export default function settings(state: ISettingsState = initialState, action: AnyAction) {
    switch (action.type) {
        case settingsConstants.SETTINGS_INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case settingsConstants.SETTINGS_INITIALIZE_FINISH:
            return {
                ...state,
                isInitialized: true
            };
        case settingsConstants.SETTINGS_SET_CURRENT_LANGUAGE:
            return {
                ...state,
                currentLanguage: action.value
            };

        default:
            return state
    }
}