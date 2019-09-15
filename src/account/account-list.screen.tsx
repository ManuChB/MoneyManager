import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import AccountList from './account-list.component';
import  accountListAction from './account-list.action';
import { IAccountListProp } from './account-list.model';
import moneyManagerAction from '../money-manager/money-manager.action';

export class AccountListScreenComponent extends Component<IAccountListProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.accountListInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <AccountList {...this.props } />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: {...state.accountList, ...state.moneyManager} };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(moneyManagerAction, dispatch),
            ...bindActionCreators<any>(accountListAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountListScreenComponent);
