import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import moment, { Moment } from 'moment';
import _ from 'lodash';

import { Button, Input, Header, CategoryPicker, KeyboardShift } from '../../../shared/components/common';
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
        const { data, onClose, onSave, categories, onRemove, icons } = this.props.state;
        console.log('-------------render-------', data);
        const { accounts } = this.state;
        return (
            
            <View style={{ flex: 1 }}>
                <Header></Header>
                <KeyboardShift hasHeader={true}>
                    {() => (
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        <DatePickerHeader 
                            dateStart={data.date } 
                            changeDay={this.changeDay.bind(this)}
                            dateMode={'day'} >
                            { data.id && <Button
                                customButtonStyle={styles.deleteButton}
                                onPress={() => onRemove(data)}
                                icon={require('../../../../assets/images/delete-bin-64.png')}>
                            </Button>}
                        </DatePickerHeader>
                        <View style={{
                            flexDirection: 'row'}}>
                            <TouchableOpacity 
                                style={[styles.checkBoxStyle, {marginLeft: 10}, data.isExpense ? null : { backgroundColor: '#6ddbcc' }]} 
                                onPress={() => this.props.actions.changeData({ ...data, isExpense: false })}>
                                <Text style={data.isExpense ? null : { color: 'white' }} >
                                    {i18n.t('newTransaction.income')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.checkBoxStyle, { marginRight: 10 }, data.isExpense ? { backgroundColor: '#F38266' }: null]}
                                onPress={() => this.props.actions.changeData({ ...data, isExpense: true })}>
                                <Text style={data.isExpense ? { color: 'white' } : null} >
                                    {i18n.t('newTransaction.expense')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <CategoryPicker 
                            label={'newTransaction.category'}
                            value={data.subCategory ? data.subCategory.value : ''}
                            data={categories} 
                            onSelect={(categoryId, subCategory) =>{ 
                                this.props.actions.changeData({ ...data, categoryId, subCategory })}} >
                        </CategoryPicker>
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
                            blurOnSubmit={true}
                            onSubmitEditing={() => this.valueInput.focus()}
                        />
                        <Input
                            inputRef={ref => this.valueInput = ref}
                            label={'newTransaction.value'}
                            value={data.value ? data.account && data.account.currency ? data.account.currency.name + " " + data.value.toString() : data.value.toString() : ""}
                            onChangeText={(value) => this.props.actions.changeData({ ...data, value: value.replace(data.account?data.account.currency.name:"", "").replace(" ", "") })}
                            returnKeyType={"next"}
                            keyboard={'numeric'}
                            blurOnSubmit={true}
                        />
                        <DataPicker
                            iconMode={true}
                                icon={data.imageIcon ? appConstants.transactionIcons[data.imageIcon.name] :
                                    data.subCategory ? appConstants.transactionIcons[data.subCategory.imageIcon.name] : appConstants.defaultTransactionIcon.icon}
                            value={data.imageIcon ? appConstants.transactionIcons[data.imageIcon.name] : ''}
                            data={icons}
                                onSelect={(image) => this.props.actions.changeData({ ...data, imageIcon: { ...image } })}
                            customContainerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center', 
                                backgroundColor: '#d5e1f0', 
                                alignSelf: 'center',
                                height: 50,
                                width: 50,
                                borderWidth: 0,
                                shadowOffset: { width: 5, height: 5 },
                                shadowOpacity: 0.5,
                                elevation: 6,
                                borderRadius: 10
                            }}>
                        </DataPicker>
                        <View style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            bottom: 0, 
                            marginTop: 10,
                            marginBottom: 20}}>
                            <Button
                                customButtonStyle={{ flex: 1, borderColor: '#F38266', backgroundColor: '#F38266' }}
                                onPress={() => onClose()}
                                label={'common.button.cancel'}>
                            </Button>
                            <Button 
                                customButtonStyle={{ flex: 1 }} 
                                onPress={() => {
                                    onSave({ 
                                        id: _.uniqueId(appConstants.localId.transaction), 
                                        ...this.props.state.data, 
                                        value: Math.abs(parseFloat(this.props.state.data.value.toString().replace(this.props.state.data.account.currency.name, "").replace(" ", "").replace(',', '.')))
                                    });
                                }} 
                                label={'common.button.save'}
                                disabled={this.checkEmpty()}>
                            </Button>
                        </View>
                    </ScrollView>
                    )}
                </KeyboardShift>
            </View>
                
        )
    }

}

