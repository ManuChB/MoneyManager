import { put, takeLatest, call, select } from 'redux-saga/effects';
import _ from 'lodash';

import moneyManagerConstans from './money-manager.constant';
import moneyManagerAction from './money-manager.action';


import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo-ads-admob';
export default [
    takeLatest(moneyManagerConstans.MONEY_MANAGER_SHOW_INTERSTITIAL_AD, initialize)
];



export function* initialize() {
    try {
        const rand = Math.random() * (100);
        if(rand > 80){
            yield put(moneyManagerAction.moneyManagerShowSpinner());
            AdMobInterstitial.setAdUnitID('ca-app-pub-5759535791118818/6182743744'); // Test ID, Replace with your-admob-unit-id
            AdMobInterstitial.setTestDeviceID('EMULATOR');
            yield call(AdMobInterstitial.requestAdAsync);
            yield call(AdMobInterstitial.showAdAsync);
            yield put(moneyManagerAction.moneyManagerHideSpinner());
        }
        
    } catch (e) {
        console.log(`[error][day-transaction][saga][initialize]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}