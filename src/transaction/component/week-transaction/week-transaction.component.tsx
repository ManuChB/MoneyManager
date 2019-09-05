import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IWeekTransactionProp } from './week-transaction.model';
import { AddButton } from '../../../shared/components/common';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import styles from './week-transaction.component.style';
import NavigationService from '../../../shared/service/navigation/navigation.service';

import Transaction from '../transaction/transaction.component';
import i18n from '../../../shared/service/i18n';
import currencyFormatter from 'currency-formatter';

export default class WeekTransaction extends Component<IWeekTransactionProp> {

    onPressNewTransaction() {
        this.props.actions.setTransactionToDetail({}, this.props.actions.weekTransactionInitializeStart.bind(this));
    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setTransactionToDetail(transactionToShow, this.props.actions.weekTransactionInitializeStart.bind(this));
    }

    onWeekChanged(date) {
        const dateStart = date.clone();
        const dateEnd = date.endOf('isoWeek');
        this.props.actions.changeWeek(dateStart, dateEnd);
    }

    getTransactionsOfCategory(transactions, key) {
        const { userCurrency } = this.props.state;
        const { balance } = transactions.balance;
        if (transactions && transactions.data.length > 0){
            return (
                <View key={key}>
                    <View style={styles.transListTitle}>
                        <Text key={key} style={styles.categoryText}> {i18n.t(transactions.category.name).toUpperCase()} </Text>
                        <Text
                            style={[styles.valueText, balance >= 0.00 ? { color: '#c2e8e3' } : { color: '#F38266' }]}>
                            {currencyFormatter.format(transactions.balance.balance, { code: userCurrency ? userCurrency.name : 'YPN', locale: i18n.getLocale() })}
                        </Text>
                    </View>
                {transactions.data.map((tranaction, subkey) => {
                    return (<Transaction data={tranaction} key={key + "_" + subkey} onPress={() => this.onPressTransaction(tranaction)}></Transaction>)
                })}
                </View>
            )
        }
    }
    render() {
        const { income, expense, balance, userCurrency } = this.props.state;
        const transactions =  this.props.transactionListState.transactionsByCategory;

        return (
            <View style={{ flex: 1 }}>
                <AddButton onPress={() => this.onPressNewTransaction()}></AddButton>
                <DatePickerHeader
                    dateStart={this.props.state.currentWeekStart}
                    dateEnd={this.props.state.currentWeekEnd}
                    changeDay={this.onWeekChanged.bind(this)}
                    dateMode={'week'}>
                </DatePickerHeader>
                <BalanceInfo income={income} expense={expense} balance={balance} currency={userCurrency} ></BalanceInfo>
                <ScrollView style={{ marginTop: 5 }}>
                    {transactions && transactions.map((data, key) => {
                        return (
                            this.getTransactionsOfCategory(data, key)
                        )
                    })}
                    <View style={{ height: 80 }}></View>
                </ScrollView>
            </View>
        )
    }
}
