import React, { StatelessComponent } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Button } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './new-transaction-modal.component.style';
import I18n from '../../../i18n';
import { ITransactionDataProp } from '../transaction/transaction.component';

const TransactionDetail: StatelessComponent<ITransactiondetailProp> = ({ data, onClose, onSave }) => {


    return (
        <View style={{
            backgroundColor: 'white',
            width: '90%',
            height: '90%',
            shadowColor: 'red',
            shadowOpacity: 10,
            elevation: 5,
            position: 'absolute'}}>
                <View style={{ }}>
                    <Text>Hello!</Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <Button customButtonStyle={{
                        flex: 1, shadowOffset: { width: 100, height: 100, },
                        shadowColor: 'black',
                        shadowOpacity: 1.0,}} onPress={onClose} label={'Cancel'}>
                    </Button>
                    <Button customButtonStyle={{flex: 1}} onPress={onSave} label={'Save'}></Button>
                </View>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
            <Button customButtonStyle={{ flex: 1 }} onPress={onSave} label={'Save'}></Button>
        </View>
    )

}
export default TransactionDetail;

export interface ITransactiondetailProp {
    data: ITransactionDataProp;
    onClose: () => void;
    onSave: () => void;

}