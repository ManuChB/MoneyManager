import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IAccountDetailProp } from './account-detail.model';
import { Header, Button, Input, KeyboardShift } from '../../shared/components/common';
import appConstants from '../../appConstants';
import styles from './account-detail.component.style';
import _ from 'lodash';
import { DataPicker } from '../../shared/components/common/DataPicker';
import i18n from '../../shared/service/i18n';

export default class AccountDetail extends Component<IAccountDetailProp> {

    checkEmpty() {
        const { account } = this.props.state;
        const isNumber = account && account.value && _.isNumber(parseFloat(account.value.toString()))
        return _.isEmpty(account) || !account.value || _.isNaN(account.value) || !isNumber || !account.currency || !account.name || !account.type;
    }

     render() {
        const { account, onClose, onSave, currencyList, accountTypeList, onRemove } = this.props.state;
        const newAccount = _.isEmpty(account) || !account.id;
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <KeyboardShift hasHeader={true}>
                    {() => (
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerTextStyle}>
                                {!newAccount ? i18n.t('accountDetail.updateAccount') : i18n.t('accountDetail.newAccount')}
                            </Text>
                            {!newAccount && <Button
                                customButtonStyle={styles.deleteButton}
                                onPress={() => onRemove(account)}
                                icon={require('../../../assets/images/delete-bin-64.png')}>
                            </Button>}
                        </View>
                        <DataPicker label={'accountDetail.type'}
                            value={account.type ? account.type.name : ''}
                            data={accountTypeList}
                            onSelect={(type) => this.props.actions.accountDetailDataChange({ ...account, type })}>
                        </DataPicker>
                        <Input
                            inputRef={ref => this.nameInput = ref}
                            label={'accountDetail.name'}
                            value={account.name}
                            onChangeText={(name) => this.props.actions.accountDetailDataChange({ ...account, name })}
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                            onSubmitEditing={() => this.descriptionInput.focus()}
                        />
                        <Input
                            inputRef={ref => this.descriptionInput = ref}
                            label={'accountDetail.description'}
                            value={account.description}
                            onChangeText={(description) => this.props.actions.accountDetailDataChange({ ...account, description })}
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                            onSubmitEditing={() => this.valueInput.focus()}
                        />
                        <Input
                            inputRef={ref => this.valueInput = ref}
                            label={'accountDetail.value'}
                            value={(account && account.value) ? account.value.toString() : null}
                            onChangeText={(value) => this.props.actions.accountDetailDataChange({ ...account, value })}
                            returnKeyType={"next"}
                            keyboard={'numeric'}
                            blurOnSubmit={true}
                        />
                        <DataPicker label={'accountDetail.currency'}
                            dontTranslate={true}
                            value={account.currency ? account.currency.nameWithSymbol : ''}
                            fieldToShow={'nameWithSymbol'}
                            data={currencyList}
                            onSelect={(currency) => this.props.actions.accountDetailDataChange({ ...account, currency }) }>
                        </DataPicker>
                            <View style={{
                                justifyContent: 'flex-end',
                                flexDirection: 'row',
                                bottom: 0,
                                marginTop: 10,
                                marginBottom: 20
                            }}>
                            <Button
                                customButtonStyle={{ flex: 1, borderColor: '#F38266', backgroundColor: '#F38266' }}
                                onPress={() => onClose()}
                                label={'common.button.cancel'}>
                            </Button>
                            <Button
                                customButtonStyle={{ flex: 1 }}
                                onPress={() => onSave({ id: _.uniqueId(appConstants.localId.account), ...account, value: parseFloat(account.value.toString().replace(',', '.')).toFixed(2) })}
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
