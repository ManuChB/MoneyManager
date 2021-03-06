import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Dimensions  } from 'react-native';
import { IReportProp } from './report.model';
import Pie from '../shared/components/pie-chart/pie-chart';
import Bar from '../shared/components/bar-chart/bar-chart';
import i18n from '../shared/service/i18n';
import appConstants from '../appConstants';
import styles from './report.component.style';
import { DatePickerHeader } from '../shared/components/date-picker/date-picker.component';
import Transaction from '../transaction/component/transaction/transaction.component';
import moment from 'moment';
import { AdMob } from '../shared/components/common';
import currencyFormatter from 'currency-formatter';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Report extends Component<IReportProp> {
    
    onSwipeLeft(gestureState) {
        this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.account);
    } 
    
    onSwipeRight(gestureState) {
        this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.transaction);
    }

    isSelectedTab(reportMode: string) {
        if (this.props.state.reportMode === reportMode) {
            return styles.selectedTab;
        } else {
            return null;
        }
    }

    onMonthChanged(date) {
        date = moment(date);
        const dateStart = moment(date);
        const dateEnd = moment(date).endOf('month');
        this.props.actions.reportChangeDate(dateStart, dateEnd);
    }

    onPressTransaction(transactionToShow) {
        this.props.actions.setTransactionToDetail(transactionToShow, this.props.actions.reportInitializeStart.bind(this));
    }

    getSelectedSliceTrans(transactions, showIncome) {
        const { uCurrency } = this.props.state;
        if(transactions.length == 0) {
            return (<View style={{ flex: 1 }}></View>)
        }
        return transactions.map((transaction, key) => {
            if (transaction.category.name == this.props.state.selectedSlice || showIncome) {
                return transaction.data.map((t, skey) => {
                    if (t.isExpense && !showIncome){
                        return (<Transaction 
                            data={t} 
                            key={key + "_" + skey} 
                            onPress={() => this.onPressTransaction(t)}
                            currency={{name:uCurrency}}></Transaction>)
                    } else if (!t.isExpense && showIncome){
                        return (<Transaction 
                            data={t} 
                            key={key + "_" + skey} 
                            onPress={() => this.onPressTransaction(t)}
                            currency={{ name: uCurrency }}>
                            </Transaction>)
                    }
                })
            }
        })
        
        
    }

    getChartMode() {
        const { transactions, selectedSlice, stadistics, totalIncome, totalExpense, uCurrency } = this.props.state;

        if (this.isSelectedTab(appConstants.reportMode.expenses)){
            return (
                <View style={{flex: 1}}>
                    <Pie
                        selectedSlice={selectedSlice}
                        onSelectSlice={this.props.actions.reportSetSelectedSlice}
                        data={stadistics}
                        showIncome={false}
                    />
                    <View style={styles.transListTitle}>
                        <Text style={styles.totalText}> {i18n.t('reportMode.totalExLabel').toUpperCase()} </Text>
                        <Text
                            style={styles.valueText}>
                            {currencyFormatter.format(totalExpense, { code: uCurrency ? uCurrency : 'YPN', locale: i18n.getLocale() })}
                        </Text>
                    </View>
                    <ScrollView style={{ flex: 1, heigth: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        {this.getSelectedSliceTrans(transactions, false)}
                        <AdMob type={'banner'}></AdMob>
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Bar
                        income={totalIncome}
                        expense={totalExpense}
                        currency={uCurrency}
                    />
                    <View style={styles.transListTitle}>
                        <Text style={styles.totalText}> {i18n.t('reportMode.totalInLabel').toUpperCase()} </Text>
                        <Text
                            style={styles.valueText}>
                            {currencyFormatter.format(totalIncome, { code: uCurrency ? uCurrency : 'YPN', locale: i18n.getLocale() })}
                        </Text>
                    </View>
                    <ScrollView style={{ flex: 1, heigth: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        {this.getSelectedSliceTrans(transactions, true)}
                        <AdMob type={'banner'}></AdMob>
                    </ScrollView>
                </View>
            )
        }
    }

    render() {
        return (
            <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                 style={{ flex: 1, backgroundColor: "#fff"}}>
                <View style={{flex:1 }}>
                    <View style={styles.mainViewStyle}>
                        <TouchableOpacity
                            style={[styles.touchableStyle, this.isSelectedTab(appConstants.reportMode.income)]}
                            onPress={() => this.props.actions.changeReportMode(appConstants.reportMode.income) }>
                            <View style={styles.touchableViewStyle}>
                                <Text style={styles.touchableTextStyle}>
                                    {i18n.t('reportMode.incomes')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.touchableStyle, this.isSelectedTab(appConstants.reportMode.expenses)]}
                            onPress={() => this.props.actions.changeReportMode(appConstants.reportMode.expenses) }>
                            <View style={styles.touchableViewStyle}>
                                <Text style={styles.touchableTextStyle}>
                                    {i18n.t('reportMode.expenses')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <DatePickerHeader dateStart={this.props.state.dateStart}
                        dateEnd={this.props.state.dateEnd}
                        changeDay={(date) => this.onMonthChanged(date)}
                        dateMode={'month'}
                        dateFormat={'MM-YYYY'} >
                    </DatePickerHeader>
                    {this.getChartMode()}
                </View>
            </GestureRecognizer>
        )
    }
}
