import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import MonthTransaction from './month-transaction.component';
import monthTransactionAction from './month-transaction.action';
import { IMonthTransactionProp } from './month-transaction.model';

export class MonthTransactionScreenComponent extends Component<IMonthTransactionProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.monthTransactionInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <MonthTransaction {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.monthTransaction };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(monthTransactionAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthTransactionScreenComponent);
