import React from 'react';
import { View } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo-ads-admob';


const AdMob = (props) => (
    <View style={{
        position: "absolute",
        bottom: 0, width: '100%'}}>
        <AdMobBanner
            style={{
                
            }}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5759535791118818/9478438613" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR" />
    </View>
);


export { AdMob };
