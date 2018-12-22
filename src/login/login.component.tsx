import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ILoginProp } from './login.model';
import { Button, Input, Header } from '../shared/components/common';
import appConstans from '../appConstants';
import styles from './login.component.style';
import { LinearGradient } from 'expo';

export default class Login extends Component<ILoginProp> {

    setMode(){
        let view = null;
        switch (this.props.state.formMode) {
            case appConstans.loginMode.register:
                view = <View style={styles.buttonContainerStyle}>
                            <Button children={'Register'} onPress={() => this.props.actions.registerSubmit(this.props.state.userName, this.props.state.password)} ></Button>
                            <Text onPress={() => this.props.actions.setFormMode(appConstans.loginMode.logIn)} >Log In</Text>
                        </View >
                break;
            case appConstans.loginMode.logIn:
                view = <View style={styles.buttonContainerStyle}>
                    <Button children={'LognIn'} onPress={() => this.props.actions.loginSubmit(this.props.state.userName, this.props.state.password)} ></Button>
                    <View style={styles.infoTextStyle}>
                        <Text onPress={() => this.props.actions.setFormMode(appConstans.loginMode.forgotPassword)} >Forgot Password</Text>
                        <Text onPress={() => this.props.actions.setFormMode(appConstans.loginMode.register)} >Creact Account</Text>
                    </View>
                </View >
                break;
            case appConstans.loginMode.forgotPassword:
                view = <View style={styles.buttonContainerStyle}>
                    <Button children={'Recover'} onPress={() => this.props.actions.registerSubmit(this.props.state.userName, this.props.state.password)} ></Button>
                    <Text onPress={() => this.props.actions.setFormMode(appConstans.loginMode.register)} >Creact Account</Text>
                </View >
                break;
            default:
                break;
        }

        return view;
    }
    render() {
        return (
            <View style={{flex:1}}>
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
                            label={'UserName'} 
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
                            label={'Pasword'} 
                            value={this.props.state.password} 
                            secureTextEntry={true} 
                            onChangeText={(text) => this.props.actions.loginSetPassword(text)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => this.registerButon.focus()}
                            blurOnSubmit={false}
                        />
                        {this.setMode()}
                        <Text style={styles.errorStyle}>{this.props.state.errorMessage}</Text>
                    </View>
                </View>
                </LinearGradient>
            </View>
        )
    }
}
// '#97A2C4', '#89A0EC', '#455FB4'