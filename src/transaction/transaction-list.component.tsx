import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ITransactionListProp } from './transaction-list.model';
import { Button } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './transaction-list.component.style';
import { LinearGradient } from 'expo';
import I18n from '../i18n';
import { TimeTabNavigation } from './component/timeTabNavigation/timeTabNavigation';
import DayTransactionScreen from './component/day-transaction/day-transaction.screen';
import MonthTransactionScreen from './component/month-transaction/month-transaction.screen';
import WeekTransactionScreen from './component/week-transaction/week-transaction.screen';
import YearTransactionScreen from './component/year-transaction/year-transaction.screen';
import TransactionDetail from './component/new-transaction-modal/new-transaction-modal.component';

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
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                    elevation: 4,
                    position: 'absolute'
                }}>
                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            shadowOpacity: 2,
                        }}>
                        </View>
                        <TransactionDetail 
                            data={{}} 
                            onClose={() => this.props.actions.showDetailModal(false)}
                            onSave={() => this.props.actions.showDetailModal(false)}
                            >
                        </TransactionDetail>
                        
                    </View>}
            </View>
        )
    }
}
