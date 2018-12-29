import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import  Account from './account.component';
import  accountAction from './account.action';
import { IAccountProp } from './account.model';

export class AccountScreenComponent extends Component<IAccountProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        //this.props.actions.accountInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <Account {...this.props } />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.account };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(accountAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreenComponent);
