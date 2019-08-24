import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { IReportProp } from './report.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import i18n from '../shared/service/i18n';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo-ads-admob';
export default class Report extends Component<IReportProp> {

   
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center" }}>
                <Text>{i18n.t('reportScreen.report')}</Text>
                <AdMobBanner
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: '100%'
                    }}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-5759535791118818/9478438613" // Test ID, Replace with your-admob-unit-id
                    testDeviceID="EMULATOR" />
                <Text>{i18n.t('reportScreen.report')}</Text>
            </View>
        )
    }
}
