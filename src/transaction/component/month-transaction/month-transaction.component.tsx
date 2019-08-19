import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Spinner, AddButton } from '../../../shared/components/common';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { IMonthTransactionProp } from './month-transaction.model';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import { Input, Header } from '../../../shared/components/common';
import appConstants from '../../../appConstants';
import styles from './month-transaction.component.style';
import moment from 'moment';
import Transaction from '../transaction/transaction.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';


export default class MonthTransaction extends Component<IMonthTransactionProp> {

    onSaveNewTransaction(transaction) {
        this.props.actions.monthTransactionNewTransaction(transaction, this.props.state.currentMonthStart, this.props.state.currentMonthEnd);
        NavigationService.navigateBack();
    }

    onPressNewTransaction() {
        this.props.actions.monthTransactionSetTransactionToDetail({}, this.onSaveNewTransaction.bind(this));
    }

    onUpdateTransaction(transaction) {
        this.props.actions.updateMonthTransaction(transaction);
        NavigationService.navigateBack();

    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setMonthTransactionToDetail(transactionToShow, this.onUpdateTransaction.bind(this));
    }

    onMonthChanged(date) {
        date = moment(date);
        const dateStart = moment(date);
        const dateEnd = moment(date).endOf('month');
        this.props.actions.changeMonth(dateStart, dateEnd);
    }

    render() {
        const { isInitialized, income, expense, balance, transactions } = this.props.state;

        return (
            <View style={{ flex: 1 }}>
                {!isInitialized && <Spinner></Spinner>}
                <AddButton onPress={() => this.onPressNewTransaction()}></AddButton>
                <DatePickerHeader 
                    dateStart={this.props.state.currentMonthStart} 
                    dateEnd={this.props.state.currentMonthEnd}
                    changeDay={(date) => this.onMonthChanged(date) } 
                    dateMode={'month'} 
                    dateFormat={'MM-YYYY'} >
                </DatePickerHeader>
                <BalanceInfo income={income} expense={expense} balance={balance} ></BalanceInfo>
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
