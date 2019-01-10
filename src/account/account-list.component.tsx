import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IAccountListProp } from './account-list.model';
import BalanceInfo from '../shared/components/balance-info/balance-info.component';
import { Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './account-list.component.style';
import I18n from '../i18n';

export default class AccountList extends Component<IAccountListProp> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <BalanceInfo></BalanceInfo>
                <ScrollView>
                    <Text>sasas!</Text>
                </ScrollView>
            </View>
        )
    }
}
