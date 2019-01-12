import React, { StatelessComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './balance-info.component.style';

const BalanceInfo: StatelessComponent<IBalanceInfoProps> = ({ income, expense, balance }) => {

    return (
        <View style={styles.infoStyle}>
            <View style={styles.textViewStyle}>
                <Text style={styles.textStyle}>{'INCOME'} </Text>
                <Text style={[styles.valueStyle, { color: 'green' }]}>
                    {income ? income.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : 0.00} 
                </Text>
            </View>
            <View style={styles.textViewStyle}>
                <Text style={styles.textStyle}>{'EXPENSE'} </Text>
                <Text style={[styles.valueStyle, { color: 'red' }]}>
                    {expense ? expense.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : 0.00} 
                </Text>
            </View>
            <View style={styles.textViewStyle}>
                <Text style={styles.textStyle}>{'BALANCE'} </Text>
                <Text style={[styles.valueStyle, balance > 0 ? { color: 'green' } : { color: 'red' }]}>
                    {balance ? balance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : 0.00} 
                </Text>
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
