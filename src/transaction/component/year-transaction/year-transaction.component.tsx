import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IYearTransactionProp } from './year-transaction.model';
import { Input, Header } from '../../../shared/components/common';
import appConstants from '../../../appConstants';
import styles from './year-transaction.component.style';

export default class YearTransaction extends Component<IYearTransactionProp> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Text>Year!</Text>
                </ScrollView>
            </View>
        )
    }
}
