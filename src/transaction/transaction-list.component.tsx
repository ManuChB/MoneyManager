import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import moment from 'moment';
import { LinearGradient } from 'expo';

import { ITransactionListProp } from './transaction-list.model';
import { Button } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './transaction-list.component.style';
import I18n from '../i18n';
import { TimeTabNavigation } from './component/timeTabNavigation/timeTabNavigation';
import DayTransactionScreen from './component/day-transaction/day-transaction.screen';
import MonthTransactionScreen from './component/month-transaction/month-transaction.screen';
import WeekTransactionScreen from './component/week-transaction/week-transaction.screen';
import YearTransactionScreen from './component/year-transaction/year-transaction.screen';
import NewTransactionScreen from './component/new-transaction-modal/new-transaction-modal.screen';

export default class TransactionList extends Component<ITransactionListProp> {

    setTimeMode() {
        let mode;
        switch (this.props.state.timeMode) {
            case appConstans.timeMode.day:
                mode = <DayTransactionScreen></DayTransactionScreen>
                break;
            case appConstans.timeMode.week:
                mode = <WeekTransactionScreen></WeekTransactionScreen>
                break;
            case appConstans.timeMode.month:
                mode = <MonthTransactionScreen></MonthTransactionScreen>
                break;
            case appConstans.timeMode.year:
                mode = <YearTransactionScreen></YearTransactionScreen>
                break;
            default:
                mode = <DayTransactionScreen></DayTransactionScreen>
                break;
        }
        return mode;
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                
                <TimeTabNavigation {...this.props}></TimeTabNavigation>
                {
                    !this.props.state.showDetailModal && 
                    <Button 
                        customButtonStyle={styles.customButtonStyle} 
                        customLabelStyle={styles.customLabelStyle} onPress={() => this.props.actions.showDetailModal(true)} 
                        label={'+'}>
                    </Button>
                }
                {this.setTimeMode()}
                
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
