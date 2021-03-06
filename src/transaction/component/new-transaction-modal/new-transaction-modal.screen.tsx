import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import TransactionDetail from './new-transaction-modal.component';
import { ITransactionDetailProp } from './new-transaction-modal.model';
import newTransactionAction from './new-transaction-modal.action';
import moneyManagerAction from '../../../money-manager/money-manager.action';

export class NewTransactionScreen extends Component<ITransactionDetailProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const { data, onClose, onSave, onRemove, getTransactions } = this.props.navigation.state.params;

        this.props.actions.newTransactionInitializeStart(
            {
                data: { ...data, 
                        isExpense: _.isNil(data.isExpense) ? true: data.isExpense , 
                        oldValue: data.value ? data.value : 0, 
                        wasExpense: !_.isNil(data.isExpense) ? data.isExpense : null,
                        date: _.isNil(data.date) ? moment().startOf('day') : data.date
                    },
                onClose,
                onSave,
                onRemove,
                getTransactions 
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
            ...bindActionCreators<any>(moneyManagerAction, dispatch),
            ...bindActionCreators<any>(newTransactionAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTransactionScreen);
