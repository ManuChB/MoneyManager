import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import TransactionDetail from './new-transaction-modal.component';
import { ITransactionDetailProp } from './new-transaction-modal.model';
import newTransactionAction from './new-transaction-modal.action';

export class NewTransactionScreen extends Component<ITransactionDetailProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        const { data, onClose, onSave } = this.props;
        this.props.actions.newTransactionInitializeStart({ data, onClose, onSave });
    }


    render() {
        return (
            <TransactionDetail actions={this.props.actions} state={this.props.state} {...this.props.navigation} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.newTransaction };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(newTransactionAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTransactionScreen);
