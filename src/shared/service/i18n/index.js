import {
    i18nActions
} from 'redux-react-native-i18n'
import locales from './locales';

export const languages = [{
        code: 'es',
        name: 'language.spanish'
    },
    {
        code: 'en',
        name: 'language.english'
    }
    /* ... */
    /* Other languages */
]
export const dictionaries = locales;

export const actionsI18n = i18nActions;
