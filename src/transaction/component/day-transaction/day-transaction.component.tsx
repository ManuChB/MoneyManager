import React, { Component } from 'react';
import { ScrollView, View, Text} from 'react-native';
import _ from 'lodash';
import { IDayTransactionProp } from './day-transaction.model';
import { AddButton } from '../../../shared/components/common';
import styles from './day-transaction.component.style';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import Transaction from '../transaction/transaction.component';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import i18n from '../../../shared/service/i18n';
import currencyFormatter from 'currency-formatter';
import transactionListAction from '../../transaction-list.action';

export default class DayTransaction extends Component<IDayTransactionProp> {

    onPressTransaction(transactionToShow) {
        this.props.actions.setTransactionToDetail(transactionToShow, this.props.actions.dayTransactionInitializeStart.bind(this));
    }

    onPressNewTransaction() {
        this.props.actions.setTransactionToDetail({}, this.props.actions.dayTransactionInitializeStart.bind(this));
    }

    getTransactionsOfCategory(transactions, key) {
        const { userCurrency } = this.props.state;
        const { balance } = transactions.balance;
        if (transactions && transactions.data.length > 0) {
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
                        return (<Transaction 
                            data={tranaction} 
                            key={key + "_" + subkey} 
                            onPress={() => this.onPressTransaction(tranaction)} 
                            currency={userCurrency}>
                        </Transaction>)
                    })}
                </View>
            )
        }
    }
    render() {
        const  { income, expense, balance, userCurrency } = this.props.state;
        const transactions = this.props.transactionListState.transactionsByCategory;

        return (
            <View style={{ flex: 1 }}>
                <AddButton onPress={() => this.onPressNewTransaction()}></AddButton>
                <DatePickerHeader dateStart= {this.props.state.date} changeDay={this.props.actions.changeDay} dateMode={'day'} ></DatePickerHeader>
                <BalanceInfo income={income} expense={expense} balance={balance} currency={userCurrency} ></BalanceInfo>
                <ScrollView style={{marginTop: 5}}>
                    {transactions && transactions.map((data, key) => {
                        return (
                            this.getTransactionsOfCategory(data, key)
                        )
                    })}
                    <View style={{ height: 80}}></View>
                </ScrollView>
            </View>
        )
    }
}
