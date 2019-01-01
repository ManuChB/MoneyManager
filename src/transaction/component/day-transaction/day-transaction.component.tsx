import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IDayTransactionProp } from './day-transaction.model';
import { Input, Header } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './day-transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../../../i18n';
import { BalanceInfo } from '../../../shared/components/balance-info/balance-info.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import Transaction from '../transaction/transaction.component';

export default class DayTransaction extends Component<IDayTransactionProp> {
    render() {
        const  { income, expense, balance } = this.props.state;
        return (
            <View style={{ flex: 1 }}>
                <DatePickerHeader {...this.props} ></DatePickerHeader>
                <BalanceInfo income={income} expense={expense} balance={balance}></BalanceInfo>
                <ScrollView style={{marginTop: 5}}>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                    <Transaction></Transaction>
                </ScrollView>
            </View>
        )
    }
}
