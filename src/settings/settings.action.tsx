import settinsConstans from './settings.constants';
import { ISettingsAction } from './settings.model';

const settingsAction: ISettingsAction = {
    settingsInitializeStart() {
        return {
            type: settinsConstans.SETTINGS_INITIALIZE_START
        }
    },

    settingsInitializeFinish() {
        return {
            type: settinsConstans.SETTINGS_INITIALIZE_FINISH
        }
    },

    
}

export default settingsAction;