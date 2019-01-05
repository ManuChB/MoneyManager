import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import moment from 'moment';
import _ from 'lodash';
import { IDayTransactionProp } from './day-transaction.model';
import { Button } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './day-transaction.component.style';
import I18n from '../../../i18n';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import Transaction from '../transaction/transaction.component';
import NewTransactionScreen from '../new-transaction-modal/new-transaction-modal.screen';

export default class DayTransaction extends Component<IDayTransactionProp> {

    onSaveNewTransaction(transaction) {
        this.props.actions.saveNewTransaction(transaction);
        this.props.actions.showDetailModal(false);
    }

    onUpdateTransaction(transaction) {
        this.props.actions.updateTransaction(transaction);
        this.props.actions.showDetailModal(false);
    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setTransactionToDetail(transactionToShow);
        this.props.actions.showDetailModal(true);
    }

    onPressNewTransaction() {
        this.props.actions.setTransactionToDetail({});
        this.props.actions.showDetailModal(true);
    }


    render() {
        const  { income, expense, balance, transactions } = this.props.state;
        console.log('[[transactions]]', transactions);
        return (
            <View style={{ flex: 1 }}>
                {
                    true &&
                    <Button
                        customButtonStyle={styles.customButtonStyle}
                        customLabelStyle={styles.customLabelStyle} onPress={() => this.onPressNewTransaction()}
                        label={'+'}>
                    </Button>
                }
                <DatePickerHeader date= {this.props.state.date} changeDay={this.props.actions.changeDay} ></DatePickerHeader>
                <BalanceInfo income={income} expense={expense} balance={balance} ></BalanceInfo>
                <ScrollView style={{marginTop: 5}}>
                    {transactions.map(data =>{
                        return (<Transaction data={data} key={data.id} onPress={() => this.onPressTransaction(data)}></Transaction>)
                    })}
                    <View style={{ height: 80}}></View>
                </ScrollView>
                {this.props.state.showDetailModal &&
                    <NewTransactionScreen
                        data={this.props.state.transactionToDetail}
                        onClose={() => this.props.actions.showDetailModal(false)}
                    onSave={_.isEmpty(this.props.state.transactionToDetail) ? this.onSaveNewTransaction.bind(this) : this.onUpdateTransaction.bind(this)}
                    >
                    </NewTransactionScreen>
                }
            </View>
        )
    }
}
