import I18n  from 'react-native-redux-i18n';
import locales from './locales';

 I18n.fallbacks = true;
 I18n.translations = locales;

export const languages = [
    {
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

export default I18n;