import React, { Component } from 'react';
import { ITransactionListProp } from './transaction-list.model';
import appConstants from '../appConstants';
import { TimeTabNavigation } from './component/timeTabNavigation/timeTabNavigation';
import DayTransactionScreen from './component/day-transaction/day-transaction.screen';
import MonthTransactionScreen from './component/month-transaction/month-transaction.screen';
import WeekTransactionScreen from './component/week-transaction/week-transaction.screen';
import YearTransactionScreen from './component/year-transaction/year-transaction.screen';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class TransactionList extends Component<ITransactionListProp> {
    onSwipeLeft(gestureState) {
        this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.report);
    }

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
            <GestureRecognizer 
                style={{ flex: 1 }} 
                onSwipeLeft={(state) => this.onSwipeLeft(state)}>                
                <TimeTabNavigation timeMode={timeMode} changeTimeFormat={changeTimeFormat}></TimeTabNavigation>                
                {this.setTimeMode()}               
            </GestureRecognizer>
        )
    }
}
