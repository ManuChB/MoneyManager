import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ITransactionProp } from './transaction.model';
import { Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../i18n';
import { TimeTabNavigation } from './component/timeTabNavigation';

export default class Transaction extends Component<ITransactionProp> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <TimeTabNavigation></TimeTabNavigation>
                <ScrollView>
                    <Text>Transaction!</Text>
                </ScrollView>
            </View>
        )
    }
}
