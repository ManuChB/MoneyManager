import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import Transaction from './transaction.component';
import  transactionAction from './transaction.action';
import { ITransactionProp } from './transaction.model';

export class TransactionScreenComponent extends Component<ITransactionProp, {}> {
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.transaction };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(transactionAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreenComponent);
