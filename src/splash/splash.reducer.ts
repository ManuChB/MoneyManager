import { INITIALIZE_START, INITIALIZE_FINISH } from './splash.constant';
import { AnyAction } from 'redux';
import { ISplashState } from './splash.model';

export const initialState: ISplashState = {
    isInitialized: false
};

export default function splash(state: ISplashState = initialState , action: AnyAction) {
    switch (action.type) {
        case INITIALIZE_START:
            return {
                ...state,
                isInitialized: false
            };
        case INITIALIZE_FINISH: 
            return {
                ...state,
                isInitialized: true
            };
        default:
            return state
    }
}