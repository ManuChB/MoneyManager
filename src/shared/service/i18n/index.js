import I18n  from 'react-native-redux-i18n';
import locales from './locales';

 I18n.fallbacks = true;
 I18n.translations = locales;

export const languages = [
    {
        code: 'es',
        name: 'language.es'
    },
    {
        code: 'en',
        name: 'language.en'
    }
    /* ... */
    /* Other languages */
];

export const defaultLanguage = {
    code: 'es',
    name: 'language.es'
};

//export const dictionaries = locales;

//export const actionsI18n = i18nActions;

export default I18n;