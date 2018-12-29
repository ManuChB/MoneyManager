import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IMoneyManagerProp } from './money-manager.model';
import { Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './money-manager.component.style';
import I18n from '../i18n';
import { MainTabNavigation } from './component/mainTabNavigation';
import Account from '../account/account.component';
import Transaction from '../transaction/transaction.component';

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
                    <Account></Account>}
                    {this.props.state.tabMode === appConstans.tabMode.transaction && <Transaction></Transaction>}
                </ScrollView>
                <MainTabNavigation {...this.props}></MainTabNavigation>
            </View>
        )
    }
}
