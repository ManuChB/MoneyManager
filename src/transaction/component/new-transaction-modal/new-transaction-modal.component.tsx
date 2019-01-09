import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { Button, Input, Header, CustomPicker } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './new-transaction-modal.component.style';
import I18n from '../../../i18n';
import { ITransactionDetailProp } from './new-transaction-modal.model';
import { DatePickerHeader}  from '../../../shared/components/date-picker/date-picker.component';
import asyncStorageService from '../../../shared/service/async-storage/async-storage.service';

export default class TransactionDetail extends Component<ITransactionDetailProp> {

    changeDay(date: string) {
        this.props.actions.changeData({ ...this.props.state.data, date })
    }

    checkEmpty() {
        const {data} = this.props.state;
        return _.isEmpty(data) || !data.value;
    }

    render() {
        const { data, onClose, onSave, categories } = this.props.state;
        return (
            <View style={{flex: 1}}>
                <Header></Header>
                <View style={{ flex: 1 }}>
                    <DatePickerHeader 
                        date={data.date ? data.date : moment().format('DD-MM-YYYY').toString()} 
                        changeDay={this.changeDay.bind(this)} >
                    </DatePickerHeader>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={[styles.checkBoxStyle, data.isExpense ? null : { backgroundColor: 'green' }]} 
                            onPress={() => this.props.actions.changeData({ ...data, isExpense: false })}>
                            <Text>Income</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.checkBoxStyle, data.isExpense ? { backgroundColor: 'red' }: null]}
                            onPress={() => this.props.actions.changeData({ ...data, isExpense: true })}>
                            <Text>Expence</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomPicker 
                        label={'Category'}
                        value={data.subCategory ? data.subCategory.value : ''}
                        data={categories} 
                        onSelect={(categoryId, subCategory) => this.props.actions.changeData({ ...data, categoryId, subCategory })}>
                    </CustomPicker>
                    <CustomPicker
                        label={'Account'}
                        value={data.subCategory ? data.subCategory.value: ''}
                        data={categories}
                        onSelect={(categoryId, subCategory) => this.props.actions.changeData({ ...data, categoryId, subCategory })}>
                    </CustomPicker>
                    <Input
                        inputRef={ref => this.descriptionInput = ref}
                        label={'Description'}
                        value={data.description}
                        onChangeText={(description) => this.props.actions.changeData({ ...data, description })}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        onSubmitEditing={() => this.valueInput.focus()}
                    />
                    <Input
                        inputRef={ref => this.valueInput = ref}
                        label={'Value'}
                        value={data.value ? data.value.toString() : null}
                        onChangeText={(value) => this.props.actions.changeData({ ...data, value: parseFloat(value) })}
                        returnKeyType={"next"}
                        keyboard={'numeric'}
                        blurOnSubmit={true}
                    />
                
                    <View style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        bottom: 0, 
                        marginBottom: 20}}>
                        <Button 
                            customButtonStyle={{ flex: 1, borderColor: '#F38266', backgroundColor: '#F38266'}} 
                            onPress={() => onClose()} 
                            label={'Cancel'}>
                        </Button>
                        <Button 
                            customButtonStyle={{ flex: 1 }} 
                            onPress={() => onSave({id: _.uniqueId('transaction_'),...this.props.state.data})} 
                            label={'Save'}
                            disabled={this.checkEmpty()}>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }

}

