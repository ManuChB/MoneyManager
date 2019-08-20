import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import TransactionDetail from './new-transaction-modal.component';
import { ITransactionDetailProp } from './new-transaction-modal.model';
import newTransactionAction from './new-transaction-modal.action';

export class NewTransactionScreen extends Component<ITransactionDetailProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        const { data, onClose, onSave } = this.props.navigation.state.params;
        console.log('NewTransactionScreen------componentWillMount---¡', _.isNil(data.isExpense), onClose, onSave);

        this.props.actions.newTransactionInitializeStart(
            {
                data: { ...data, 
                        isExpense: _.isNil(data.isExpense) ? true: data.isExpense , 
                        oldValue: data.value ? data.value : 0, 
                        wasExpense: !_.isNil(data.isExpense) ? data.isExpense : null
                    },
                onClose,
                onSave 
            });
    }


    render() {
        return (
            <TransactionDetail {...this.props} />
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
