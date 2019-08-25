import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import WeekTransaction from './week-transaction.component';
import weekTransactionAction from './week-transaction.action';
import transactionListAction from '../../transaction-list.action';
import { IWeekTransactionProp } from './week-transaction.model';

export class WeekTransactionScreenComponent extends Component<IWeekTransactionProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.weekTransactionInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <WeekTransaction {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.weekTransaction, transactionListState: state.transactionList };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(transactionListAction, dispatch),
            ...bindActionCreators<any>(weekTransactionAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekTransactionScreenComponent);
