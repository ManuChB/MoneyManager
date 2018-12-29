import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IWeekTransactionProp } from './week-transaction.model';
import { Input, Header } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './week-transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../../../i18n';

export default class WeekTransaction extends Component<IWeekTransactionProp> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Text>Week!</Text>
                </ScrollView>
            </View>
        )
    }
}
