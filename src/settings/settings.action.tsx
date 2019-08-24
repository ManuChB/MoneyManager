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
    settingsSetCurrentLanguage(uLanguage: string) {
        return {
            type: settinsConstans.SETTINGS_SET_CURRENT_LANGUAGE,
            value: uLanguage
        }
    },
    settingsSetCurrentCurrency(currency: any){
        return {
            type: settinsConstans.SETTINGS_SET_CURRENT_CURRRENCY,
            value: currency
        }
    },
    settingsSetCurrencyList(currencyList: Array<any>){
        return {
            type: settinsConstans.SETTINGS_SET_CURRRENCY_LIST,
            value: currencyList
        }
    },
    logOut() {
        return {
            type: settinsConstans.SETTINGS_LOG_OUT
        }
    }
    
}

export default settingsAction;