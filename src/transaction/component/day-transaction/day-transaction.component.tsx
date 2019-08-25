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

export default class DayTransaction extends Component<IDayTransactionProp> {
    
    onSaveNewTransaction(transaction) {
        this.props.actions.saveNewTransaction(transaction);
        NavigationService.navigateBack();
    }

    onUpdateTransaction(transaction) {
        this.props.actions.updateTransaction(transaction);
        NavigationService.navigateBack();
    }

    onRemoveTransaction(transaction) {
        this.props.actions.removeTransaction(transaction);
        NavigationService.navigateBack();
    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setTransactionToDetail(transactionToShow, this.onUpdateTransaction.bind(this), this.onRemoveTransaction.bind(this) );
    }

    onPressNewTransaction() {
        this.props.actions.setTransactionToDetail({}, this.onSaveNewTransaction.bind(this), this.onRemoveTransaction.bind(this) );
    }

    onLongPress(data) {
        this.props.actions.longPress(data);
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
                            {transactions.balance.balance.toLocaleString(i18n.getLocale(), { style: 'currency', currency: userCurrency ? userCurrency.name : 'YPN' })}
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
