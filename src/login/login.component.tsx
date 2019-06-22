import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ILoginProp } from './login.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import appConstants from '../appConstants';
import styles from './login.component.style';
import { LinearGradient } from 'expo-linear-gradient';
import I18n from '../i18n';

export default class Login extends Component<ILoginProp> {

    componentDidMount() {
        this.props.actions.setFormMode(appConstants.loginMode.register, this.setMode(this.props.state.formMode));
    }

    setMode = (mode: string) => {
        let view = null;
        switch (mode) {
            case appConstants.loginMode.register:
                view = {
                    buttonLabel: I18n.t('register'),
                    buttonOnPress: () => this.props.actions.registerSubmit(this.props.state.userName, this.props.state.password),
                    leftTextOnPress: () => {this.props.actions.setFormMode(appConstants.loginMode.logIn, this.setMode(appConstants.loginMode.logIn))},
                    leftTextLabel: `Already register ? ${'\n'}LognIn`,
                    rightTextOnPress: null,
                    rightTextLabel: null
                }
                break;
            case appConstants.loginMode.logIn:
                view = {
                    buttonLabel: `Log In`,
                    buttonOnPress: () => this.props.actions.loginSubmit(this.props.state.userName, this.props.state.password),
                    leftTextOnPress: () => this.props.actions.setFormMode(appConstants.loginMode.forgotPassword, this.setMode(appConstants.loginMode.forgotPassword)),
                    leftTextLabel: `Forgot Password ?${'\n'}Recover`,
                    rightTextOnPress: () => this.props.actions.setFormMode(appConstants.loginMode.register, this.setMode(appConstants.loginMode.register)),
                    rightTextLabel: `New here ?${'\n'}Register`
                }
                break;
            case appConstants.loginMode.forgotPassword:
                view = {
                    buttonLabel: 'Recover',
                    buttonOnPress: () => this.props.actions.registerSubmit(this.props.state.userName, this.props.state.password),
                    leftTextOnPress: () => this.props.actions.setFormMode(appConstants.loginMode.register, this.setMode(appConstants.loginMode.register)),
                    leftTextLabel: `New here ?${'\n'}Register`,
                    rightTextOnPress: null,
                    rightTextLabel: null
                }
                break;
            default:
                break;
        }

        return view;
    }
    render() {
        return (
            <View style={{flex:1}}>
                {this.props.state.showSpinner && <Spinner></Spinner>}
                <Header ></Header>
                <LinearGradient 
                    start={{ x: 0.0, y: 0.2 }} 
                    end={{ x: 0.75, y: 1.0 }}
                    locations={[0, 0.5, 0.9]}
                    colors={['#97A2C4', '#CFCD5B', '#350F90']} 
                    style={styles.linearGradient}>

                <View style={styles.containerStyle}>
                    <View style={styles.subContainerStyle}>
                        <Input 
                            label={'Username'} 
                            value={this.props.state.userName} 
                            onChangeText={(text) => this.props.actions.loginSetUserName(text)}
                            keyboard={'email-address'}
                            capitalize={'none'}
                            returnKeyType={"next"}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            blurOnSubmit={false}
                        />
                        <Input 
                            inputRef={ref => this.passwordInput = ref}
                            label={'Password'} 
                            value={this.props.state.password} 
                            secureTextEntry={true} 
                            onChangeText={(text) => this.props.actions.loginSetPassword(text)}
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                        />
                        <View style={styles.buttonContainerStyle}>
                            <Button
                                label={this.props.state.screenMode.buttonLabel}
                                onPress={this.props.state.screenMode.buttonOnPress}
                            />
                        </View >
                        <Text style={styles.errorStyle}>{this.props.state.errorMessage}</Text>
                    </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.modelTextStyle} onPress={this.props.state.screenMode.leftTextOnPress} >{this.props.state.screenMode.leftTextLabel}</Text>
                            {this.props.state.screenMode.rightTextLabel && 
                                <Text style={styles.modelTextStyle} onPress={this.props.state.screenMode.rightTextOnPress} >{this.props.state.screenMode.rightTextLabel}</Text>}
                        </View>
                </View>
                </LinearGradient>
            </View>
        )
    }
}
