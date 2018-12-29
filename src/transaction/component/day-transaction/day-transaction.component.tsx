import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IDayTransactionProp } from './day-transaction.model';
import { Input, Header } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './day-transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../../../i18n';
import { BalanceInfo } from '../../../shared/components/balance-info/balance-info.component';

export default class DayTransaction extends Component<IDayTransactionProp> {
    render() {
        const data = {
            income: '100.00',
            expense: '40.00',
            balance: '60.00'
        }
        return (
            <View style={{ flex: 1 }}>
                <BalanceInfo income={data.income} expense={data.expense} balance={data.balance}></BalanceInfo>
                <ScrollView>
                    <Text>Day!</Text>
                </ScrollView>
            </View>
        )
    }
}
