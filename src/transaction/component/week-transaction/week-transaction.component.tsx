import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IWeekTransactionProp } from './week-transaction.model';
import { Button, Spinner } from '../../../shared/components/common';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import appConstants from '../../../appConstants';
import styles from './week-transaction.component.style';
import I18n from '../../../i18n';

export default class WeekTransaction extends Component<IWeekTransactionProp> {
    render() {
        const { isInitialized, income, expense, balance } = this.props.state;
        return (
            <View style={{ flex: 1 }}>
                {!isInitialized && <Spinner></Spinner>}
                <BalanceInfo income={income} expense={expense} balance={balance} ></BalanceInfo>
                <ScrollView>
                    <Text>Week!</Text>
                </ScrollView>
            </View>
        )
    }
}
