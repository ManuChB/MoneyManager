import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { IAccountListProp } from './account-list.model';
import BalanceInfo from '../shared/components/balance-info/balance-info.component';
import { AddButton, Spinner } from '../shared/components/common';
import i18n from '../shared/service/i18n';
import Account from './account/account.component';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import styles from './account-list.component.style';

export default class AccountList extends Component<IAccountListProp> {


    onSaveAccount(account) {
        this.props.actions.saveNewAccount(account);
        NavigationService.navigateBack();
    }

    onPressNewAccount() {
        this.props.actions.setAccountToDetail({}, this.onSaveAccount.bind(this), this.onRemoveAccount.bind(this));
    }

    onPressAccount(account) {
        this.props.actions.setAccountToDetail(account, this.onSaveAccount.bind(this), this.onRemoveAccount.bind(this))    }

    onRemoveAccount(account) {
        this.props.actions.removeAccount(account);
        NavigationService.navigateBack();
    }

    getAccountsFromTypeList(accountTypeList, typekey, accountsBalance){
        if (accountTypeList.data.length > 0) {
            const accountBalance = accountsBalance.filter(
                (balance) =>  balance.type && balance.type.name === accountTypeList.type.name
            )[0];
            return (
                <TouchableOpacity key={typekey} style={{marginBottom: 20}} onPress={() => {}}>
                    <View style={styles.accountListTitle}>
                        <Text key={typekey} style={{ color: 'white' }}>
                            {i18n.t(accountTypeList.type.name).toUpperCase()}
                        </Text>     
                    </View>
                      
                    {accountBalance && <BalanceInfo 
                        income={accountBalance.income} 
                        expense={accountBalance.expense} 
                        balance={accountBalance.balance}
                        incLabel={'accountList.assets'}
                        expLabel={'accountList.liabilities'}
                        balLabel={'accountList.balance'}>

                        </BalanceInfo>} 
                    {accountTypeList.data.map((account, key) => {
                        return (<Account key={typekey + "_" + key} data={account} onPress={() => this.onPressAccount(account)} ></Account>)
                    })}
                </TouchableOpacity>
            )
        }
        else{
            return
        }
    }

    render() {
        const { accountsBalance, accountListByType } = this.props.state;
        const balance = accountsBalance.filter(
            (balance) => balance.type === appConstants.accountTypesGeneral.name
        )[0];
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 2,
                    position: 'relative',
                    backgroundColor: '#3ca8cf',
                    height: 30
                }}>
                    <Text style={{color: 'white'}}>
                        {i18n.t('accountList.globalBalance').toUpperCase()}
                    </Text>
                </View>
                <BalanceInfo 
                    income={balance.income} 
                    expense={balance.expense} 
                    balance={balance.balance} 
                    incLabel={'accountList.assets'}  
                    expLabel={'accountList.liabilities'} 
                    balLabel={'accountList.balance'} >
                </BalanceInfo>
                <AddButton onPress={() => this.onPressNewAccount()}></AddButton>
                <ScrollView>
                    {accountListByType.map((accountTypeList, typekey) => {
                        return (
                            this.getAccountsFromTypeList(accountTypeList, typekey, accountsBalance)
                         )
                    })}
                    <View style={{ height: 60 }}></View>
                </ScrollView>
            </View>
        )
    }
}
