import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import AccountDetail from './account-detail.component';
import  accountDetailAction from './account-detail.action';
import { IAccountDetailProp } from './account-detail.model';

export class AccountDetailScreen extends Component<IAccountDetailProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        const { account, onClose, onSave } = this.props.navigation.state.params;
        this.props.actions.accountDetailInitializeStart({ account: account || {}, onClose, onSave });
    }

    render() {
        return (
            <AccountDetail {...this.props } />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.accountDetail };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(accountDetailAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailScreen);
