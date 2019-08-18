import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { IAccountProp } from './account.model';
import { Input, Header } from '../../shared/components/common';
import appConstants from '../../appConstants';
import styles from './account.component.style';

const Account: StatelessComponent<IAccountProp> = ({data, onPress}) => {
    const { value, name, type, currency, description} = data;

    return (
        <TouchableOpacity style={styles.infoStyle} onPress={onPress}>
            <View style={styles.dataViewStyle}>
                <View style={ {flex: 1, justifyContent: 'center', alignItems: 'center'} }>
                    <Text>{name }</Text>
                </View>
                <View style={{ flex: 5 }}></View>
                <View style={{
                    flex: 2, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={styles.valueStyle}>{value ? value.toLocaleString('en-UK', { style: 'currency', currency: currency.name }) : 0}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Account;
