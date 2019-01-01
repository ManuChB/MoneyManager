import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ITransactionListProp } from './transaction-list.model';
import { Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './transaction-list.component.style';
import { LinearGradient } from 'expo';
import I18n from '../i18n';
import { TimeTabNavigation } from './component/timeTabNavigation/timeTabNavigation';
import DayTransactionScreen from './component/day-transaction/day-transaction.screen';
import MonthTransactionScreen from './component/month-transaction/month-transaction.screen';
import WeekTransactionScreen from './component/week-transaction/week-transaction.screen';
import YearTransactionScreen from './component/year-transaction/year-transaction.screen';

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
                {this.setTimeMode()}
            </View>
        )
    }
}
