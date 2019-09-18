import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { IAccountProp } from './account.model';
import { Input, Header } from '../../shared/components/common';
import appConstants from '../../appConstants';
import styles from './account.component.style';
import i18n from '../../shared/service/i18n';
import currencyFormatter from 'currency-formatter';

const Account: StatelessComponent<IAccountProp> = ({data, onPress, uCurrency}) => {
    const { value, name, type, currency, description, rateValue} = data;

    return (
        <TouchableOpacity style={styles.infoStyle} onPress={onPress}>
            <View style={styles.dataViewStyle}>
                <View style={ styles.name }>
                    <Text>{name }</Text>
                </View>
                <View style={styles.space}></View>
                <View style={styles.mainView}>
                    <Text style={[styles.valueStyle, value > 0 ? { color: 'green' } : { color: 'red' }]}>
                        {value ? currencyFormatter.format(value, { code: currency ? currency.name : 'YPN', locale: i18n.getLocale() }) : 0}
                    </Text>
                    {rateValue  &&<Text style={[styles.valueRateStyle]}>
                        {rateValue ? currencyFormatter.format(rateValue, { code: uCurrency ? uCurrency.name : 'YPN', locale: i18n.getLocale() }) : 0}
                    </Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Account;
