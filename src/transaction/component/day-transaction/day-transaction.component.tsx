import React, { Component } from 'react';
import { ScrollView, View} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import { IDayTransactionProp } from './day-transaction.model';
import { AddButton, Spinner  } from '../../../shared/components/common';
import appConstants from '../../../appConstants';
import styles from './day-transaction.component.style';
import BalanceInfo from '../../../shared/components/balance-info/balance-info.component';
import { DatePickerHeader } from '../../../shared/components/date-picker/date-picker.component';
import Transaction from '../transaction/transaction.component';
import NewTransactionScreen from '../new-transaction-modal/new-transaction-modal.screen';
import NavigationService from '../../../shared/service/navigation/navigation.service';

export default class DayTransaction extends Component<IDayTransactionProp> {
    
    onSaveNewTransaction(transaction) {
        this.props.actions.saveNewTransaction(transaction);
        NavigationService.navigateBack();
    }

    onUpdateTransaction(transaction) {
        this.props.actions.updateTransaction(transaction);
        NavigationService.navigateBack();

    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setTransactionToDetail(transactionToShow, this.onUpdateTransaction.bind(this) );
    }

    onPressNewTransaction() {
        this.props.actions.setTransactionToDetail({}, this.onSaveNewTransaction.bind(this));
    }


    render() {
        const  { income, expense, balance, transactions } = this.props.state;
        return (
            <View style={{ flex: 1 }}>
                {!this.props.state.isInitialized && <Spinner></Spinner>}
                <AddButton onPress={() => this.onPressNewTransaction()}></AddButton>
                <DatePickerHeader dateStart= {this.props.state.date} changeDay={this.props.actions.changeDay} dateMode={'day'} ></DatePickerHeader>
                <BalanceInfo income={income} expense={expense} balance={balance} ></BalanceInfo>
                <ScrollView style={{marginTop: 5}}>
                    {transactions && transactions.map((data, key) =>{
                        return (<Transaction data={data} key={key} onPress={() => this.onPressTransaction(data)}></Transaction>)
                    })}
                    <View style={{ height: 80}}></View>
                </ScrollView>
            </View>
        )
    }
}
