import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { IAccountProp } from './account.model';
import { Input, Header } from '../../shared/components/common';
import appConstants from '../../appConstants';
import styles from './account.component.style';
import i18n from '../../shared/service/i18n';
const Account: StatelessComponent<IAccountProp> = ({data, onPress}) => {
    const { value, name, type, currency, description} = data;

    return (
        <TouchableOpacity style={styles.infoStyle} onPress={onPress}>
            <View style={styles.dataViewStyle}>
                <View style={ { width: '35%', justifyContent: 'center', alignItems: 'center'} }>
                    <Text>{name }</Text>
                </View>
                <View style={{ width: '30%' }}></View>
                <View style={{
                    width: '35%', 
                     justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={[styles.valueStyle, value > 0 ? { color: 'green' } : { color: 'red' }]}>
                        {value ? value.toLocaleString(i18n.getLocale(), { style: 'currency', currency: currency.name, currencyDisplay:'symbol' }) : 0}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Account;
