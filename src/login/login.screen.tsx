import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import Login from './login.component';
import loginAction from './login.action';
import { ILoginProp } from './login.model';

export class LoginScreenComponent extends Component<ILoginProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.loginInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <Login {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.login };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(loginAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenComponent);
