import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IMonthTransactionProp } from './month-transaction.model';
import { Input, Header } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './month-transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../../../i18n';

export default class MonthTransaction extends Component<IMonthTransactionProp> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Text>Month!</Text>
                </ScrollView>
            </View>
        )
    }
}
