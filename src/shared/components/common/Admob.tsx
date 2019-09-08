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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bottom: 0
    }}>
        <AdMobBanner
            style={{
                alignSelf: 'center',
                flex: 1
            }}
            adUnitID="ca-app-pub-5759535791118818/9478438613" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR" />
    </View>
);


export { AdMob };
