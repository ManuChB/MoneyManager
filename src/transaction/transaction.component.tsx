import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ITransactionProp } from './transaction.model';
import { Button, Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../i18n';

export default class Transaction extends Component<ITransactionProp> {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text> Transaction </Text>
            </View>
        )
    }
}
