import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reactNavigationMiddleware } from '../NavigationState';
import rootReducer from '../reducers';
import rootSaga from '../saga';;


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
    return store;
}