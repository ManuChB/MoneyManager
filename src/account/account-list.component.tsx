import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { IAccountListProp } from './account-list.model';
import BalanceInfo from '../shared/components/balance-info/balance-info.component';
import { AddButton, AdMob } from '../shared/components/common';
import i18n from '../shared/service/i18n';
import Account from './account/account.component';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import styles from './account-list.component.style';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class AccountList extends Component<IAccountListProp> {

    onSwipeLeft(gestureState) {
        this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.settings);
    }

    onSwipeRight(gestureState) {
        this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.report);
    }

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
                <View key={typekey} style={{marginBottom: 20}}>
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
                        balLabel={'accountList.balance'}
                        currency={this.props.state.userCurrency}>
                        </BalanceInfo>} 
                    {accountTypeList.data.map((account, key) => {
                        return (<Account 
                            key={typekey + "_" + key} 
                            data={account} 
                            onPress={() => this.onPressAccount(account)}
                            uCurrency={this.props.state.userCurrency} >
                            </Account>)
                    })}
                </View>
            )
        }
        else{
            return
        }
    }

    render() {
        const { accountsBalance, accountListByType } = this.props.state;
        const rand = Math.random() * (100);
        const balance = accountsBalance.filter(
            (balance) => balance.type === appConstants.accountTypesGeneral.name
        )[0];
        return (
            <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                 style={{ flex: 1 }}>
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
                    balLabel={'accountList.balance'}
                    currency={this.props.state.userCurrency} >
                </BalanceInfo>
                <AddButton onPress={() => this.onPressNewAccount()} customButtonStyle={ {} }></AddButton>

                <ScrollView style={{ flex: 1, heigth: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', marginTop: 20 }}>
                    {accountListByType.map((accountTypeList, typekey) => {
                        return (
                            this.getAccountsFromTypeList(accountTypeList, typekey, accountsBalance)
                         )
                    })}
                    <View style={{ height: 80 }}></View>
                    {false && rand > 50 && <AdMob type={'banner'}></AdMob>}
                </ScrollView>
            </GestureRecognizer>
        )
    }
}
