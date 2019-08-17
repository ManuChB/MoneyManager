import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { IReportProp } from './report.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import appConstants from '../appConstants';
import { LinearGradient } from 'expo-linear-gradient';
import I18n from '../shared/service/i18n/i18n';

export default class Report extends Component<IReportProp> {


    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Report!</Text>
            </View>
        )
    }
}
