import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IAccountProp } from './account.model';
import { Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './account.component.style';
import { LinearGradient } from 'expo';
import I18n from '../i18n';

export default class Account extends Component<IAccountProp> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <ScrollView>
                    <Text>sasas!</Text>
                </ScrollView>
            </View>
        )
    }
}
