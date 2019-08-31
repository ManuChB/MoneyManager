import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { IReportProp } from './report.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import i18n from '../shared/service/i18n';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo-ads-admob';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';

export default class Report extends Component<IReportProp> {

   
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View>
                    <Text>
                        Bezier Line Chart
                    </Text>
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel={'$'}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',    
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
                <AdMobBanner
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: '100%'
                    }}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-5759535791118818/9478438613" // Test ID, Replace with your-admob-unit-id
                    testDeviceID="EMULATOR" />
            </View>
        )
    }
}
