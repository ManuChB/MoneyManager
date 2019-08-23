import locales from './locales';
import { LocaleConfig } from 'react-native-calendars';
//import moment from 'moment/min/moment-with-locales';
import moment from 'moment';

const config = {
    i18n: null,
    locale: null,
    shortLocale: null
};

class I18nService {

    setI18n(i18n) {
        config.i18n = i18n;
        i18n.fallbacks = true;
        i18n.translations = locales;
    }

    setLocale(locale){
        config.i18n.locale = locale;
        config.locale = locale;
        config.shortLocale = locale.split('-')[0];

        moment.locale(locale.split('-')[0]);

        LocaleConfig.locales[locale] = config.i18n.t('calendarLocaleConfig');
        LocaleConfig.defaultLocale = locale;    
    }

    t(lable){
        return config.i18n.t(lable);
    }

    getShortLocale() {
        return config.shortLocale;
    }

    getLocale() {
        return config.locale;
    }
}

export default new I18nService();

export const languages = [{
        code: 'es-ES',
        name: 'language.esES',
        icon: require('../../../../assets/images/spain-flag-80.png')
    },
    {
        code: 'en-UK',
        name: 'language.enUK',
        icon: require('../../../../assets/images/uk-flag-80.png')
    }
    /* ... */
    /* Other languages */
];

export const defaultLanguage = {
    code: 'en-UK',
    name: 'language.enUK'
};