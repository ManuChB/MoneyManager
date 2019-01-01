import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Input, Header } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../../../i18n';

export default class Transaction extends Component<ITransactionProp> {

    render() {
        return (
            <TouchableOpacity style={styles.infoStyle}>
                <View style={styles.dataViewStyle}>
                    <View style={{
                        flex: 2, justifyContent: 'center',
                        alignItems: 'center' }}>
                        <Image style={{ width: 35, height: 35 }} source={require('../../../../assets/images/cash-filled-64.png')} />
                        <Text>Account</Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text>Ex. Type</Text>
                        <Text>Ex. Desctription</Text>
                    </View>
                    <View style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text>500€</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export interface ITransactionProp {
    label?: string,
}
