import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IAccountDetailProp } from './account-detail.model';
import { Header, Button, Input } from '../../shared/components/common';
import appConstans from '../../appConstants';
import styles from './account-detail.component.style';
import I18n from '../../i18n';
import _ from 'lodash';

export default class AccountDetail extends Component<IAccountDetailProp> {

    checkEmpty() {
        return false;
    
    }
    render() {
        console.log('----------------------------------------------------', this.props);
        const { account, onClose, onSave } = this.props.state;
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <Input
                    inputRef={ref => this.nameInput = ref}
                    label={'Name'}
                    value={account.name}
                    onChangeText={(name) => this.props.actions.accountDetailDataChange({ ...account, name })}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.descriptionInput.focus()}
                />
                <Input
                    inputRef={ref => this.descriptionInput = ref}
                    label={'Description'}
                    value={account.description}
                    onChangeText={(description) => this.props.actions.accountDetailDataChange({ ...account, description })}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.valueInput.focus()}
                />
                <Input
                    inputRef={ref => this.valueInput = ref}
                    label={'Value'}
                    value={account.value ? account.value.toString() : null}
                    onChangeText={(value) => this.props.actions.accountDetailDataChange({ ...account, value: parseFloat(value) })}
                    returnKeyType={"next"}
                    keyboard={'numeric'}
                    blurOnSubmit={true}
                />
                <View style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    bottom: 0,
                    marginBottom: 20
                }}>
                    <Button
                        customButtonStyle={{ flex: 1, borderColor: '#F38266', backgroundColor: '#F38266' }}
                        onPress={() => onClose()}
                        label={'Cancel'}>
                    </Button>
                    <Button
                        customButtonStyle={{ flex: 1 }}
                        onPress={() => onSave({ id: _.uniqueId('account_'), ...account })}
                        label={'Save'}
                        disabled={this.checkEmpty()}>
                    </Button>
                </View>
            </View>
        )
    }
}
