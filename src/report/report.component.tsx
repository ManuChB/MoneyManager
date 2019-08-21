import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { IReportProp } from './report.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import i18n from '../shared/service/i18n';

export default class Report extends Component<IReportProp> {


    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>{i18n.t('reportScreen.report')}</Text>
            </View>
        )
    }
}
