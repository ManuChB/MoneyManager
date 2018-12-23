// //import ReactNative from 'react-native';
// import I18n from 'react-native-i18n';

// // Import all locales
// import en from '../locales/en.json';
// import es from '../locales/es.json';

// // Should the app fallback to English if user locale doesn't exists
// I18n.fallbacks = true;

// // Define the supported translations
// I18n.translations = {
//     en,
//     es
// };
// I18n.locale = 'en';

// //const currentLocale = I18n.currentLocale();

// // Is it a RTL language?
// //export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// //ReactNative.I18nManager.allowRTL(isRTL);

// // The method we'll use instead of a regular string
// export function strings(name, params = {}) {
//     return I18n.t(name, params);
// }

export function changeLanguage(language) {
    console.log(`[i18n][changeLanguage]-> ${language}`);
    I18n.locale = language;
}


// export default I18n;

'use strict';
import I18n from 'react-native-i18n';

I18n.locale = 'en';
I18n.fallbacks = true;
// export const getLanguages = () => Promise.resolve(['en']);
I18n.translations = {
    'en': require('../translations/en'),
    'es': require('../translations/es'),
};

export default I18n;