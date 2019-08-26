import React, { StatelessComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './balance-info.component.style';
import i18n from '../../../shared/service/i18n';
import currencyFormatter from 'currency-formatter';

const BalanceInfo: StatelessComponent<IBalanceInfoProps> = ({ income, expense, balance, noLabels, incLabel, expLabel, balLabel, currency }) => {
    return (
        <View style={styles.infoStyle}>
            <View style={styles.textViewStyle}>
                {!noLabels && <Text style={styles.textStyle}>
                    {i18n.t(incLabel || 'balanceInfo.income')}
                </Text>}
                <Text style={[styles.valueStyle, { color: 'green' }]}>
                    {income ? currencyFormatter.format(income, { code: currency ? currency.name : 'YPN', locale: i18n.getLocale() }) : 0.00} 
                </Text>
            </View>
            <View style={styles.textViewStyle}>
                {!noLabels && <Text style={styles.textStyle}>
                    {i18n.t(expLabel || 'balanceInfo.expense')}
                </Text>}
                <Text style={[styles.valueStyle, { color: 'red' }]}>
                    {expense ? currencyFormatter.format(expense, { code: currency ? currency.name : 'YPN', locale: i18n.getLocale() }) : 0.00} 
                </Text>
            </View>
            <View style={styles.textViewStyle}>
                {!noLabels && <Text style={styles.textStyle}>
                    {i18n.t(balLabel || 'balanceInfo.balance')}
                </Text>}
                <Text style={[styles.valueStyle, balance > 0 ? { color: 'green' } : { color: 'red' }]}>
                    {balance ? currencyFormatter.format(balance, { code: currency ? currency.name : 'YPN', locale: i18n.getLocale() }) : 0.00} 
                </Text>
            </View>
        </View>
    )
}
export default BalanceInfo;

export interface IBalanceInfoProps {
    income?: number,
    expense?: number,
    balance?: number,
    incLabel?: string, 
    expLabel?: string, 
    balLabel?: string,
    noLabels?: boolean,
    currency?: any
}
