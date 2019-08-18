import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reactNavigationMiddleware } from '../NavigationState';
import rootReducer from '../reducers';
import rootSaga from '../saga';
import { defaultLanguage } from '../shared/service/i18n';
import { setLocale } from 'react-native-redux-i18n';

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

    //store.dispatch(actionsI18n.setDictionaries(dictionaries));
    //store.dispatch(actionsI18n.setTranslations(languages));
    AsyncStorageService.getItem('USER_LANGUAGE').then((uLanguage) => {
        console.log('-----------', uLanguage);
        if (uLanguage) {
            store.dispatch(setLocale(uLanguage.code));
        } else {
            AsyncStorageService.setItem('USER_LANGUAGE', defaultLanguage);
            store.dispatch(setLocale(defaultLanguage.code));

        }
    });
    
    return store;
};
