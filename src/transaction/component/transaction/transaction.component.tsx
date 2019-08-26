import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Input, Header } from '../../../shared/components/common';
import appConstants from '../../../appConstants';
import styles from './transaction.component.style';
import AsyncStorageService from '../../../shared/service/async-storage/async-storage.service';
import { Moment } from 'moment';
import { IAccountData } from '../../../account/account/account.model';
import i18n from '../../../shared/service/i18n';
import currencyFormatter from 'currency-formatter';

const Transaction: StatelessComponent<ITransactionProp> = ({data, onPress, onLongPress}) => {
    const { value, account, imageId, categoryId, subCategory, description, isExpense } = data;
    
    const getIcon = (imageId) => {
        if(!imageId){
            return appConstants.defaultTransactionIcon.icon;
        }
        const icon = appConstants.transactionIcons.filter(
            (i) => i.name === imageId.name
        )[0];
        if (!icon) {
            return appConstants.defaultTransactionIcon.icon;
        }
        return icon.icon;
    }
    const img = getIcon(imageId);

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
                        {currencyFormatter.format(value, { code: account ? account.currency.name : 'YPN', locale: i18n.getLocale() })}
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
    imageId?: {name: string, icon: any},
    categoryId?: string,
    subCategory?: {id: number, value: string},
    description?: string
    date?: Moment;
    isExpense?: boolean;
    wasExpense?: boolean;
}
