import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import YearTransaction from './year-transaction.component';
import yearTransactionAction from './year-transaction.action';
import { IYearTransactionProp } from './year-transaction.model';

export class YearTransactionScreenComponent extends Component<IYearTransactionProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        //this.props.actions.transactionInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <YearTransaction {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.yearTransaction };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(yearTransactionAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(YearTransactionScreenComponent);
