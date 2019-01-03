import React, { StatelessComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './balance-info.component.style';

const BalanceInfo: StatelessComponent<IBalanceInfoProps> = ({ income, expense, balance }) => {

    return (
        <View style={styles.infoStyle}>
            <View style={styles.textViewStyle}>
                <Text style={styles.textStyle}>{'income'} </Text>
                <Text style={[styles.textStyle, {color:'green'}]}>{income} </Text>
            </View>
            <View style={styles.textViewStyle}>
                <Text style={styles.textStyle}>{'expense'} </Text>
                <Text style={[styles.textStyle, {color:'red'}]}>{expense} </Text>
            </View>
            <View style={styles.textViewStyle}>
                <Text style={styles.textStyle}>{'balance'} </Text>
                <Text style={[styles.textStyle, balance > 0 ? { color: 'green' } : { color: 'red' }]}>{balance} </Text>
            </View>
        </View>
    )
}
export default BalanceInfo;

export interface IBalanceInfoProps {
    income?: Number,
    expense?: Number,
    balance?: Number
}
