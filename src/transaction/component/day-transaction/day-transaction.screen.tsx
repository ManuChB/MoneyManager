import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import DayTransaction from './day-transaction.component';
import dayTransactionAction from './day-transaction.action';
import { IDayTransactionProp } from './day-transaction.model';

export class DayTransactionScreenComponent extends Component<IDayTransactionProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
    this.props.actions.dayTransactionInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <DayTransaction {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.dayTransaction };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(dayTransactionAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DayTransactionScreenComponent);
