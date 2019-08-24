import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IWeekTransactionProp } from './week-transaction.model';
import { Button, Spinner, AddButton } from '../../../shared/components/common';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import appConstants from '../../../appConstants';
import styles from './week-transaction.component.style';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import moment from 'moment';
import WeekSelector from 'react-native-week-selector';
import Transaction from '../transaction/transaction.component';

export default class WeekTransaction extends Component<IWeekTransactionProp> {

    onSaveNewTransaction(transaction) {
        this.props.actions.weekTransactionNewTransaction(transaction, this.props.state.currentWeekStart, this.props.state.currentWeekEnd);
        NavigationService.navigateBack();
    }

    onPressNewTransaction() {
        this.props.actions.setWeekTransactionToDetail({}, this.onSaveNewTransaction.bind(this), this.onRemoveTransaction.bind(this) );
    }

    onUpdateTransaction(transaction) {
        this.props.actions.updateWeekTransaction(transaction);
        NavigationService.navigateBack();

    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setWeekTransactionToDetail(transactionToShow, this.onUpdateTransaction.bind(this), this.onRemoveTransaction.bind(this) );
    }

    onWeekChanged(date) {
        const dateStart = date.clone();
        const dateEnd = date.endOf('isoWeek');
        this.props.actions.changeWeek(dateStart, dateEnd);
    }

    onRemoveTransaction(transaction) {
        this.props.actions.removeTransaction(transaction);
        NavigationService.navigateBack();

    }

    render() {
        const { isInitialized, income, expense, balance, transactions, userCurrency } = this.props.state;
        
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
                        return (<Transaction data={data} key={key} onPress={() => this.onPressTransaction(data)}></Transaction>)
                    })}
                    <View style={{ height: 80 }}></View>
                </ScrollView>
            </View>
        )
    }
}
