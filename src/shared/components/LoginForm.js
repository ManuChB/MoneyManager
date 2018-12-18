import React, { Component } from 'react';
import { View, Text } from 'react-native';


import { connect } from 'react-redux';

import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChange, passwordChange, logginUser } from '../actions';

// import { strings, changeLanguage, getLanguage } from '../i18n';
import I18n from '../i18n';


class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChange(text);
    }

    onPasswordChange(text) {
        this.props.passwordChange(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.logginUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                {I18n.t('login')}
            </Button>
        );
    }
    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgrondColor: 'white' }} >
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }
    render() {
        return (
            <Card style={{  }}>
                <CardSection>
                    <Input
                        label={I18n.t('Email')}
                        placeHolder="email@mail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        //onChangeText={value => this.props.employeeUpdate({ prop: 'email', value })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label={I18n.t('password')}
                        placeHolder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        //onChangeText={value => this.props.employeeUpdate({ prop: 'password', value })}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    const { email, password, error, loading } = state.auth;
    return {
        email,
        password,
        error,
        loading
    };
};

export default connect(mapStateToProps, { 
    emailChange, passwordChange, logginUser }
    )(LoginForm);
