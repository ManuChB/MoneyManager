import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment, { Moment } from 'moment';
import _ from 'lodash';

import { Button, Input, Header, CustomPicker } from '../../../shared/components/common';
import appConstants from '../../../appConstants';
import styles from './new-transaction-modal.component.style';
import { ITransactionDetailProp } from './new-transaction-modal.model';
import { DatePickerHeader}  from '../../../shared/components/date-picker/date-picker.component';
import { DataPicker } from '../../../shared/components/common/DataPicker';
import i18n from '../../../shared/service/i18n';
import AccountService from '../../../shared/service/account/account.service';
import NavigationService from '../../../shared/service/navigation/navigation.service';

export default class  extends Component<ITransactionDetailProp> {
    constructor(props){
        super(props);
        this.state = {accounts: props.state.accounts};
    }

    componentWillReceiveProps() {
        this.setState({ accounts: this.props.state.accounts });
    }


    changeDay(date: Moment) {
        this.props.actions.changeData({ ...this.props.state.data, date: date.startOf('day') })
    }

    checkEmpty() {
        const {data} = this.props.state;
        return _.isEmpty(data) || !data.value || !data.account || !data.subCategory;
    }

    async onSaveAccount(account) {
        await AccountService.newAccount(account);
        NavigationService.navigateBack();
        const accountList = await AccountService.getAccounts();
        this.setState({accounts: accountList});
    }
    
    render() {
        const { data, onClose, onSave, categories, isInitialized } = this.props.state;
        const { accounts } = this.state;
        if (!data.date) { this.changeDay(moment().startOf('day')) }
        return (
            <View style={{flex: 1}}>
                <Header></Header>
                <View style={{ flex: 1 }}>
                    <DatePickerHeader 
                        dateStart={data.date } 
                        changeDay={this.changeDay.bind(this)}
                        dateMode={'day'} >
                    </DatePickerHeader>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={[styles.checkBoxStyle, data.isExpense ? null : { backgroundColor: '#6ddbcc' }]} 
                            onPress={() => this.props.actions.changeData({ ...data, isExpense: false })}>
                            <Text style={data.isExpense ? null : { color: 'white' }} >
                                {i18n.t('newTransaction.income')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.checkBoxStyle, data.isExpense ? { backgroundColor: '#F38266' }: null]}
                            onPress={() => this.props.actions.changeData({ ...data, isExpense: true })}>
                            <Text style={data.isExpense ? { color: 'white' } : null} >
                                {i18n.t('newTransaction.expense')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <CustomPicker 
                        label={'newTransaction.category'}
                        value={data.subCategory ? data.subCategory.value : ''}
                        data={categories} 
                        onSelect={(categoryId, subCategory) => this.props.actions.changeData({ ...data, categoryId, subCategory })}>
                    </CustomPicker>
                        <DataPicker
                            dontTranslate={true}
                            label={'newTransaction.account'}
                            value={data.account ? data.account.name: ''}
                            data={accounts}
                            onSelect={(account) => this.props.actions.changeData({ ...data, account }) }>
                            <Button
                                customButtonStyle={{ marginBottom: 20 }}
                            onPress={() => AccountService.accountToDetail({}, this.onSaveAccount.bind(this)) }
                            label={'newTransaction.button.newAccount'}>
                            </Button>
                        </DataPicker>

                        
                    <Input
                        inputRef={ref => this.descriptionInput = ref}
                        label={'newTransaction.description'}
                        value={data.description}
                        onChangeText={(description) => this.props.actions.changeData({ ...data, description })}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        onSubmitEditing={() => this.valueInput.focus()}
                    />
                    <Input
                        inputRef={ref => this.valueInput = ref}
                        label={'newTransaction.value'}
                        value={data.value ? data.account ? data.account.currency.name + " " + data.value.toString() : data.value.toString() : ""}
                        onChangeText={(value) => this.props.actions.changeData({ ...data, value: value.replace(data.account?data.account.currency.name:"", "").replace(" ", "") })}
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
                            customButtonStyle={{  flex: 1, borderColor: '#F38266', backgroundColor: '#F38266'}} 
                            onPress={() => onClose()} 
                            label={'common.button.cancel'}>
                        </Button>
                        <Button 
                            customButtonStyle={{ flex: 1 }} 
                            onPress={() => {
                                onSave({ 
                                    id: _.uniqueId(appConstants.localId.transaction), 
                                    ...this.props.state.data, 
                                    value: parseFloat(this.props.state.data.value.toString().replace(this.props.state.data.account.currency.name, "").replace(" ", "").replace(',', '.'))
                                });
                            }} 
                            label={'common.button.save'}
                            disabled={this.checkEmpty()}>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }

}

