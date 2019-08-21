import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reactNavigationMiddleware } from '../NavigationState';
import rootReducer from '../reducers';
import rootSaga from '../saga';
import i18nService, {
    languages, defaultLanguage
} from '../shared/service/i18n';
import i18n from 'i18n-js';

import * as Localization from 'expo-localization';


import AsyncStorageService from '../shared/service/async-storage/async-storage.service';

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    let middlewares;
    if (global.window && global.window.__REDUX_DEVTOOLS_EXTENSION__) {
        middlewares = compose(
            applyMiddleware(sagaMiddleware, thunk, reactNavigationMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    } else {
        middlewares = compose(
            applyMiddleware(sagaMiddleware, thunk, reactNavigationMiddleware)
        );
    }

    const store = createStore(
        rootReducer,
        middlewares
    );
    sagaMiddleware.run(rootSaga);

    i18nService.setI18n(i18n);
    AsyncStorageService.getItem('USER_LANGUAGE').then((uLanguage) => {
        if (uLanguage) {
            i18nService.setLocale(uLanguage.code);
        } else {
            const deviceLanguage = languages.filter(
                function (language) {
                    return language.code == Localization.locale;
                }
            )[0];
            AsyncStorageService.setItem('USER_LANGUAGE', deviceLanguage || defaultLanguage);
            i1i18nService.setLocale(deviceLanguage ? deviceLanguage.code : defaultLanguage.code);
        }
    });
    
    return store;
};
