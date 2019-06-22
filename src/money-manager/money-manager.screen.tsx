import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import MoneyManager from './money-manager.component';
import  moneyManagerAction from './money-manager.action';
import { IMoneyManagerProp } from './money-manager.model';

export class MoneyManagerScreenComponent extends Component<IMoneyManagerProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.moneyManagerInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <MoneyManager {...this.props } />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.moneyManager };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(moneyManagerAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyManagerScreenComponent);
