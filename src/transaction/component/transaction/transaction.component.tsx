import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Input, Header } from '../../../shared/components/common';
import appConstants from '../../../appConstants';
import styles from './transaction.component.style';
import AsyncStorageService from '../../../shared/service/async-storage/async-storage.service';
import { Moment } from 'moment';
import { IAccountData } from '../../../account/account/account.model';
import I18n, { Loc } from 'react-native-redux-i18n';

const Transaction: StatelessComponent<ITransactionProp> = ({data, onPress}) => {
    const { value, account, imageId, categoryId, subCategory, description, isExpense } = data;
    
    const getIcon = (image) => {
        var icon;
        switch (image) {
            case appConstants.transactionIcons.cash.id:
                icon = appConstants.transactionIcons.cash.value;
                break;
            case appConstants.transactionIcons.credit.id:
                icon = appConstants.transactionIcons.credit.value;
                break; 
            case appConstants.transactionIcons.default.id:
                icon = appConstants.transactionIcons.default.value;
                break;
            default:
                icon = appConstants.transactionIcons.default.value;
                break;
        }
        return icon;
    }
    const img = getIcon(account.type.id);

    return (
        <TouchableOpacity style={styles.infoStyle} onPress={onPress}>
            <View style={styles.dataViewStyle}>
                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center' }}>
                    <Image style={{ width: 35, height: 35 }} source={img} />
                    <Text>{account ? account.name : ''}</Text>
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.textStyle}> <Loc locKey={subCategory ? subCategory.value : ''}></Loc></Text>
                    <Text>{description}</Text>
                </View>
                <View style={{
                        flex: 2, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={[styles.valueStyle, isExpense ? styles.expense : styles.income]}>{value.toLocaleString('en-UK', { style: 'currency', currency: account ? account.currency.name : 'EUR' })}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Transaction;

export interface ITransactionProp {
    data: ITransactionDataProp;
    onPress: ()=> void;
    
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
