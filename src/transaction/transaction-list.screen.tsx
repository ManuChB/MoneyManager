import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import TransactionList from './transaction-list.component';
import  transactionListAction from './transaction-list.action';
import { ITransactionListProp } from './transaction-list.model';

export class TransactionListScreenComponent extends Component<ITransactionListProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        //this.props.actions.transactionListInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <TransactionList {...this.props } />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.transactionList };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(transactionListAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListScreenComponent);
