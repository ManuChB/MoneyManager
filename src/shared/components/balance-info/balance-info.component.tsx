import React, { StatelessComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './balance-info.component.style';
import i18n from '../../../shared/service/i18n';

const BalanceInfo: StatelessComponent<IBalanceInfoProps> = ({ income, expense, balance, noLabels, incLabel, expLabel, balLabel }) => {

    return (
        <View style={styles.infoStyle}>
            <View style={styles.textViewStyle}>
                {!noLabels && <Text style={styles.textStyle}>
                    {i18n.t(incLabel || 'balanceInfo.income')}
                </Text>}
                <Text style={[styles.valueStyle, { color: 'green' }]}>
                    {income ? income.toLocaleString(i18n.getLocale(), { style: 'currency', currency: 'EUR' }) : 0.00} 
                </Text>
            </View>
            <View style={styles.textViewStyle}>
                {!noLabels && <Text style={styles.textStyle}>
                    {i18n.t(expLabel || 'balanceInfo.expense')}
                </Text>}
                <Text style={[styles.valueStyle, { color: 'red' }]}>
                    {expense ? expense.toLocaleString(i18n.getLocale(), { style: 'currency', currency: 'EUR' }) : 0.00} 
                </Text>
            </View>
            <View style={styles.textViewStyle}>
                {!noLabels && <Text style={styles.textStyle}>
                    {i18n.t(balLabel || 'balanceInfo.balance')}
                </Text>}
                <Text style={[styles.valueStyle, balance > 0 ? { color: 'green' } : { color: 'red' }]}>
                    {balance ? balance.toLocaleString(i18n.getLocale(), { style: 'currency', currency: 'EUR' }) : 0.00} 
                </Text>
            </View>
        </View>
    )
}
export default BalanceInfo;

export interface IBalanceInfoProps {
    income?: Number,
    expense?: Number,
    balance?: Number,
    incLabel?: string, 
    expLabel?: string, 
    balLabel?: string,
    noLabels?: boolean
}
