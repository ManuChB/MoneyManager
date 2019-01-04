import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Input, Header } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './transaction.component.style';
import { LinearGradient } from 'expo';
import I18n from '../../../i18n';

const Transaction: StatelessComponent<ITransactionProp> = ({data}) => {
    const { value, account, image, type, description } = data;

    const getIcon = (image) => {
        var icon;
        switch (image) {
            case appConstans.transactionIcons.cash.id:
                icon = appConstans.transactionIcons.cash.value;
                break;
            case appConstans.transactionIcons.credit.id:
                icon = appConstans.transactionIcons.credit.value;
                break; 
            case appConstans.transactionIcons.default.id:
                icon = appConstans.transactionIcons.default.value;
                break;
            default:
                icon = appConstans.transactionIcons.default.value;
                break;
        }
        return icon;
    }
    const img = getIcon(image);


    return (
        <TouchableOpacity style={styles.infoStyle}>
            <View style={styles.dataViewStyle}>
                <View style={{
                    flex: 2, justifyContent: 'center',
                    alignItems: 'center' }}>
                    <Image style={{ width: 35, height: 35 }} source={img} />
                    <Text>{account}</Text>
                </View>
                <View style={{ flex: 5 }}>
                    <Text>{type}</Text>
                    <Text>{description}</Text>
                </View>
                <View style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text>{value}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Transaction;

export interface ITransactionProp {
    data: ITransactionDataProp;
    
}

export interface ITransactionDataProp {
    id?: string,
    value?: Number,
    account?: string,
    image?: string,
    type?: string,
    description?: string
    date?: string;
}
