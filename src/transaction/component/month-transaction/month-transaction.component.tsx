import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { AddButton } from '../../../shared/components/common';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { IMonthTransactionProp } from './month-transaction.model';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import styles from './month-transaction.component.style';
import moment from 'moment';
import Transaction from '../transaction/transaction.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import i18n from '../../../shared/service/i18n';
import currencyFormatter from 'currency-formatter';


export default class MonthTransaction extends Component<IMonthTransactionProp> {

    onSaveNewTransaction(transaction) {
        this.props.actions.monthTransactionNewTransaction(transaction, this.props.state.currentMonthStart, this.props.state.currentMonthEnd);
        NavigationService.navigateBack();
    }

    onPressNewTransaction() {
        this.props.actions.setMonthTransactionToDetail({}, this.onSaveNewTransaction.bind(this), this.onRemoveTransaction.bind(this) );
    }

    onUpdateTransaction(transaction) {
        this.props.actions.updateMonthTransaction(transaction);
        NavigationService.navigateBack();

    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setMonthTransactionToDetail(transactionToShow, this.onUpdateTransaction.bind(this), this.onRemoveTransaction.bind(this) );
    }

    onRemoveTransaction(transaction) {
        this.props.actions.removeTransaction(transaction);
        NavigationService.navigateBack();
    }

    onMonthChanged(date) {
        date = moment(date);
        const dateStart = moment(date);
        const dateEnd = moment(date).endOf('month');
        this.props.actions.changeMonth(dateStart, dateEnd);
    }

    getTransactionsOfCategory(transactions, key) {
        const { userCurrency } = this.props.state;
        const { balance } = transactions.balance;
        if (transactions && transactions.data.length > 0) {
            return (
                <View key={key}>
                    <View style={styles.transListTitle}>
                        <Text key={key} style={styles.categoryText}> {i18n.t('categoriesIds.' + transactions.category.id).toUpperCase()} </Text>
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
        const transactions = this.props.transactionListState.transactionsByCategory;

        return (
            <View style={{ flex: 1 }}>
                <AddButton onPress={() => this.onPressNewTransaction()}></AddButton>
                <DatePickerHeader 
                    dateStart={this.props.state.currentMonthStart} 
                    dateEnd={this.props.state.currentMonthEnd}
                    changeDay={(date) => this.onMonthChanged(date) } 
                    dateMode={'month'} 
                    dateFormat={'MM-YYYY'} >
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
