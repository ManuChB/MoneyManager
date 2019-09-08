import React from 'react';
import { View } from 'react-native';
import {
    AdMobBanner,
    PublisherBanner,
} from 'expo-ads-admob';


const AdMob = ({type}) => (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bottom: 0
    }}>
        {type == 'banner' && <AdMobBanner
            style={{
                alignSelf: 'center',
                flex: 1
            }}
            adUnitID="ca-app-pub-5759535791118818/7517018475" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR" />}

        {type == 'publisher' && <PublisherBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5759535791118818/7517018475" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            onDidFailToReceiveAdWithError={this.bannerError}
            onAdMobDispatchAppEvent={this.adMobEvent} />}
    </View>
);


export { AdMob };
