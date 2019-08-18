import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { IReportProp } from './report.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import I18n, { Loc } from 'react-native-redux-i18n';

export default class Report extends Component<IReportProp> {


    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Loc locKey={'reportScreen.report'}></Loc>
            </View>
        )
    }
}
