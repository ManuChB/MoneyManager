import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IMoneyManagerProp } from './money-manager.model';
import { Input, Header, Spinner } from '../shared/components/common';
import appConstants from '../appConstants';
import styles from './money-manager.component.style';
import { MainTabNavigation } from './component/mainTabNavigation';
import AccountListScreen from '../account/account-list.screen';
import TransactionListScreen from '../transaction/transaction-list.screen';
import SettingsScreen from '../settings/settings.screen';
import ReportScreen from '../report/report.screen';
import i18n from '../shared/service/i18n';

export default class MoneyManager extends Component<IMoneyManagerProp> {
    setLanguage(locale: string) {
        i18n.setLocale(locale);
        this.props.actions.moneyManagerSetLocale(locale);
    }
    
    render() {
        return (
            <View style={{ flex: 1 }} pointerEvents={this.props.state.showSpinner ? 'none' : 'auto'}>
                {this.props.state.showSpinner && <Spinner></Spinner>}
                <Header></Header>
                    {this.props.state.tabMode === appConstants.tabMode.account && <AccountListScreen></AccountListScreen>}
                    {this.props.state.tabMode === appConstants.tabMode.transaction && <TransactionListScreen></TransactionListScreen>}
                    {this.props.state.tabMode === appConstants.tabMode.settings && <SettingsScreen setLanguage={this.setLanguage.bind(this)}></SettingsScreen>}
                    {this.props.state.tabMode === appConstants.tabMode.report && <ReportScreen></ReportScreen>}
                <MainTabNavigation {...this.props}></MainTabNavigation>
            </View>
        )
    }
}
