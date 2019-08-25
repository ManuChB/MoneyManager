import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Input, Header } from '../../../shared/components/common';
import appConstants from '../../../appConstants';
import styles from './transaction.component.style';
import AsyncStorageService from '../../../shared/service/async-storage/async-storage.service';
import { Moment } from 'moment';
import { IAccountData } from '../../../account/account/account.model';
import i18n from '../../../shared/service/i18n';

const Transaction: StatelessComponent<ITransactionProp> = ({data, onPress, onLongPress}) => {
    const { value, account, imageId, categoryId, subCategory, description, isExpense } = data;
    
    const getIcon = (account) => {
        const image = account && account.type ? account.type.iconName : null;
        var icon;
        switch (image) {
            case appConstants.transactionIcons.cash.iconName:
                icon = appConstants.transactionIcons.cash.value;
                break;
            case appConstants.transactionIcons.credit.iconName:
                icon = appConstants.transactionIcons.credit.value;
                break; 
            case appConstants.transactionIcons.default.iconName:
                icon = appConstants.transactionIcons.default.value;
                break;
            default:
                icon = appConstants.transactionIcons.default.value;
                break;
        }
        return icon;
    }
    const img = getIcon(account);

    return (
        <TouchableOpacity style={styles.infoStyle} onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.dataViewStyle}>
                <View style={{
                    width:'15%', justifyContent: 'center',
                    alignItems: 'center' }}>
                    <Image style={{ width: 35, height: 35 }} source={img} />
                </View>
                <View style={{ width: '55%' }}>
                    <Text > {subCategory ? i18n.t(subCategory.value).toUpperCase() : ''}</Text>
                    <Text style={styles.textStyle}> {description}</Text>
                    <Text> {account ? account.name : ''}</Text>
                </View>
                <View style={{
                    width: '30%', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={[styles.valueStyle, isExpense ? styles.expense : styles.income]}>
                        {value.toLocaleString(i18n.getLocale(), { style: 'currency', currency: account ? account.currency.name : 'EUR' })}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Transaction;

export interface ITransactionProp {
    data: ITransactionDataProp;
    onPress: ()=> void;
    onLongPress?: () => void;

    
}

export interface ITransactionDataProp {
    id?: string;
    value?: number,
    oldValue?: number,
    account?: IAccountData,
    imageId?: string,
    categoryId?: string,
    subCategory?: {id: number, value: string},
    description?: string
    date?: Moment;
    isExpense?: boolean;
    wasExpense?: boolean;
}
