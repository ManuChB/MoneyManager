import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import moment from 'moment';
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

    render() {

        const  { income, expense, balance, transactions } = this.props.state;
        return (
            <View style={{ flex: 1 }}>
                {
                    true &&
                    <Button
                        customButtonStyle={styles.customButtonStyle}
                        customLabelStyle={styles.customLabelStyle} onPress={() => this.props.actions.showDetailModal(true)}
                        label={'+'}>
                    </Button>
                }
                <DatePickerHeader date= {this.props.state.date} changeDay={this.props.actions.changeDay} ></DatePickerHeader>
                <BalanceInfo income={income} expense={expense} balance={balance} ></BalanceInfo>
                <ScrollView style={{marginTop: 5}}>
                    {transactions.map(data =>{
                        return ( <Transaction data={data} key={data.id}></Transaction>)
                    })}
                    <View style={{ height: 80}}></View>
                </ScrollView>
                {this.props.state.showDetailModal &&
                    <NewTransactionScreen
                        data={{
                            id: '11',
                            value: 234,
                            account: 'Cash',
                            image: 'CASH',
                            type: 'Food',
                            description: 'Example for a description that will be add by the user',
                            date: moment().format('DD-MM-YYYY').toString()
                        }}
                        onClose={() => this.props.actions.showDetailModal(false)}
                        onSave={() => this.props.actions.showDetailModal(false)}
                    >
                    </NewTransactionScreen>
                }
            </View>
        )
    }
}
