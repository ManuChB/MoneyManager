import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import moment from 'moment';

import { ITransactionListProp } from './transaction-list.model';
import { Button } from '../shared/components/common';
import appConstants from '../appConstants';
import styles from './transaction-list.component.style';
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
            case appConstants.timeMode.day:
                mode = <DayTransactionScreen></DayTransactionScreen>
                break;
            case appConstants.timeMode.week:
                mode = <WeekTransactionScreen></WeekTransactionScreen>
                break;
            case appConstants.timeMode.month:
                mode = <MonthTransactionScreen></MonthTransactionScreen>
                break;
            case appConstants.timeMode.year:
                mode = <YearTransactionScreen></YearTransactionScreen>
                break;
            default:
                mode = <DayTransactionScreen></DayTransactionScreen>
                break;
        }
        return mode;
    }


    render() {
        const { state: {timeMode }, actions:{changeTimeFormat}} = this.props;
        return (
            <View style={{ flex: 1 }}>                
                <TimeTabNavigation timeMode={timeMode} changeTimeFormat={changeTimeFormat}></TimeTabNavigation>                
                {this.setTimeMode()}               
            </View>
        )
    }
}
