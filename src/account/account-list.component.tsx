import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { IAccountListProp } from './account-list.model';
import BalanceInfo from '../shared/components/balance-info/balance-info.component';
import { Button } from '../shared/components/common';
import appConstants from '../appConstants';
import styles from './account-list.component.style';
import I18n from '../i18n';
import Account from './account/account.component';
import NavigationService from '../shared/service/navigation/navigation.service';

export default class AccountList extends Component<IAccountListProp> {


    onSaveAccount(account) {
        this.props.actions.saveNewAccount(account);
        NavigationService.navigateBack();
    }

    onPressNewAccount() {
        this.props.actions.setAccountToDetail({}, this.onSaveAccount.bind(this));
    }

    render() {
        const { accountList } = this.props.state;

        return (
            <View style={{ flex: 1 }}>
                <BalanceInfo></BalanceInfo>
                <Button
                    customButtonStyle={styles.customButtonStyle}
                    customLabelStyle={styles.customLabelStyle} onPress={() => this.onPressNewAccount()}
                    label={'+'}>
                </Button>
                <ScrollView>
                    {accountList.map((account, key) => {
                        return (<Account key={key} data={account} onPress={() => this.props.actions.setAccountToDetail(account, this.onSaveAccount.bind(this)) } ></Account>)
                    })}
                </ScrollView>
            </View>
        )
    }
}
