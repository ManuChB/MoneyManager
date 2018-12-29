import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ITransactionProp } from './transaction.model';
import { Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../i18n';
import { TimeTabNavigation } from './component/timeTabNavigation/timeTabNavigation';
import DayTransaction from './component/day-transaction/day-transaction.component';
import MonthTransaction from './component/month-transaction/month-transaction.component';
import WeekTransaction from './component/week-transaction/week-transaction.component';
import YearTransaction from './component/year-transaction/year-transaction.component';

export default class Transaction extends Component<ITransactionProp> {

    setTimeMode() {
        let mode;
        console.log('------', this.props);
        switch (this.props.state.timeMode) {
            case appConstans.timeMode.day:
                mode = <DayTransaction></DayTransaction>
                break;
            case appConstans.timeMode.week:
                mode = <WeekTransaction></WeekTransaction>
                break;
            case appConstans.timeMode.month:
                mode = <MonthTransaction></MonthTransaction>
                break;
            case appConstans.timeMode.year:
                mode = <YearTransaction></YearTransaction>
                break;
            default:
                mode = <DayTransaction></DayTransaction>
                break;
        }
        return mode;
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <TimeTabNavigation {...this.props}></TimeTabNavigation>
                <ScrollView>
                    {this.setTimeMode()}
                </ScrollView>
            </View>
        )
    }
}
