import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IMoneyManagerProp } from './money-manager.model';
import { Input, Header } from '../shared/components/common';
import appConstants from '../appConstants';
import styles from './money-manager.component.style';
import I18n from '../i18n';
import { MainTabNavigation } from './component/mainTabNavigation';
import AccountListScreen from '../account/account-list.screen';
import TransactionListScreen from '../transaction/transaction-list.screen';

export default class MoneyManager extends Component<IMoneyManagerProp> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                    {this.props.state.tabMode === appConstants.tabMode.account &&
                        <AccountListScreen></AccountListScreen>}
                    {this.props.state.tabMode === appConstants.tabMode.transaction && <TransactionListScreen></TransactionListScreen>}
                <MainTabNavigation {...this.props}></MainTabNavigation>
            </View>
        )
    }
}
