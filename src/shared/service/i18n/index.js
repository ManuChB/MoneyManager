import locales from './locales';

const config = {
    i18n: null
};

class I18nService {

    setI18n(i18n) {
        config.i18n = i18n;
        i18n.fallbacks = true;
        i18n.translations = locales;
    }

    setLocale(locale){
        config.i18n.locale = locale;
    }

    t(lable){
        return config.i18n.t(lable);
    }
}

export default new I18nService();

export const languages = [{
        code: 'es-ES',
        name: 'language.esES'
    },
    {
        code: 'en-UK',
        name: 'language.enUK'
    }
    /* ... */
    /* Other languages */
];

export const defaultLanguage = {
    code: 'en-UK',
    name: 'language.enUK'
};