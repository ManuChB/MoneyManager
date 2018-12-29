import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IMoneyManagerProp } from './money-manager.model';
import { Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './money-manager.component.style';
import I18n from '../i18n';
import { MainTabNavigation } from './component/mainTabNavigation';
import AccountScreen from '../account/account.screen';
import TransactionScreen from '../transaction/transaction.screen';

export default class MoneyManager extends Component<IMoneyManagerProp> {
componentDidMount(){

    console.log('MoneyManager[componentDidMount]', this.props);
}

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <ScrollView>
                    {this.props.state.tabMode === appConstans.tabMode.account &&
                        <AccountScreen></AccountScreen>}
                    {this.props.state.tabMode === appConstans.tabMode.transaction && <TransactionScreen></TransactionScreen>}
                </ScrollView>
                <MainTabNavigation {...this.props}></MainTabNavigation>
            </View>
        )
    }
}
