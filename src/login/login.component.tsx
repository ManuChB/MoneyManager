import React, { Component } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Image, NetInfo } from 'react-native';
import { ILoginProp } from './login.model';
import { Button, Input, Header, Spinner, KeyboardShift } from '../shared/components/common';
import appConstants from '../appConstants';
import styles from './login.component.style';
import { LinearGradient } from 'expo-linear-gradient';
import i18n, { languages } from '../shared/service/i18n';
import {DataPicker} from '../shared/components/common/DataPicker';

export default class Login extends Component<ILoginProp> {
    constructor(props) {
        super(props);
        this.state = { isConnected: true };
    }
    componentDidMount() {
        this.props.actions.setFormMode(appConstants.loginMode.register, this.setMode(this.props.state.formMode));
        NetInfo.isConnected.addEventListener( "connectionChange", this.handleConnectivityChange );
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener( "connectionChange", this.handleConnectivityChange );
    }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            alert(i18n.t('general.noWifi'));
            this.setState({ isConnected });
        }
    };
    
    setLanguage(language) {
        i18n.setLocale(language.code);
        this.props.actions.loginSetCurrentLanguage(language);
    }

    setMode = (mode: string) => {
        let view = null;
        switch (mode) {
            case appConstants.loginMode.register:
                view = {
                    buttonLabel: 'loginScreen.register',
                    buttonOnPress: () => { Keyboard.dismiss(); this.props.actions.registerSubmit(this.props.state.userName, this.props.state.password); },
                    leftTextOnPress: () => {this.props.actions.setFormMode(appConstants.loginMode.logIn, this.setMode(appConstants.loginMode.logIn))},
                    leftTextLabel: 'loginScreen.alreadyRegistered',
                    rightTextOnPress: null,
                    rightTextLabel: null
                }
                break;
            case appConstants.loginMode.logIn:
                view = {
                    buttonLabel: 'loginScreen.login',
                    buttonOnPress: () => { Keyboard.dismiss(); this.props.actions.loginSubmit(this.props.state.userName, this.props.state.password); },
                    leftTextOnPress: () => this.props.actions.setFormMode(appConstants.loginMode.forgotPassword, this.setMode(appConstants.loginMode.forgotPassword)),
                    leftTextLabel: 'loginScreen.forgotPsw',
                    rightTextOnPress: () => this.props.actions.setFormMode(appConstants.loginMode.register, this.setMode(appConstants.loginMode.register)),
                    rightTextLabel: 'loginScreen.newRegister'
                }
                break;
            case appConstants.loginMode.forgotPassword:
                view = {
                    buttonLabel: 'loginScreen.recover',
                    buttonOnPress: () => { Keyboard.dismiss(); this.props.actions.recoverPassword(this.props.state.userName); },
                    leftTextOnPress: () => this.props.actions.setFormMode(appConstants.loginMode.register, this.setMode(appConstants.loginMode.register)),
                    leftTextLabel: 'loginScreen.newRegister',
                    rightTextOnPress: () => { this.props.actions.setFormMode(appConstants.loginMode.logIn, this.setMode(appConstants.loginMode.logIn)) },
                    rightTextLabel: 'loginScreen.alreadyRegistered'
                }
                break;
            default:
                break;
        }

        return view;
    }
    render() {
        return (
            <TouchableWithoutFeedback style={{flex:1}} onPress={()=> Keyboard.dismiss()}>
                <View style={{ flex: 1, backgroundColor: 'red' }} pointerEvents={(this.props.state.showSpinner || !this.state.isConnected) ? 'none' : 'auto'}>
                    {(this.props.state.showSpinner || !this.state.isConnected) && <Spinner conectionError={!this.state.isConnected}></Spinner>}
                    <Header ></Header>
                    <LinearGradient 
                        start={{ x: 0.0, y: 0.2 }} 
                        end={{ x: 0.75, y: 1.0 }}
                        locations={[0, 0.3, 0.7]}
                        colors={['#58e8da', '#97A2C4', '#8362d1']} //['#97A2C4', '#CFCD5B', '#350F90']
                        style={styles.linearGradient}>
                        <KeyboardShift >
                            {() => (
                            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                                <DataPicker label={'settingsScreen.language'}
                                    icon={this.props.state.currentLanguage.icon}
                                    data={languages}
                                    onSelect={(lang) => this.setLanguage(lang)}
                                    customContainerStyle={{ alignSelf: 'flex-end', height: '10%', marginTop: 0 }}>
                                </DataPicker>
                                <View style={styles.containerStyle}>
                                    <View>
                                        <Image style={{ alignSelf: 'center', width: 125, height: 111 }} source={require('../../assets/Untitled.png')} />
                                    </View>
                                    <View style={styles.subContainerStyle}>
                                        <Input 
                                            label={'loginScreen.email'} 
                                            value={this.props.state.userName} 
                                            onChangeText={(text) => this.props.actions.loginSetUserName(text)}
                                            keyboard={'email-address'}
                                            capitalize={'none'}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                            blurOnSubmit={true}
                                        />
                                        {this.props.state.formMode !== appConstants.loginMode.forgotPassword && <Input 
                                            inputRef={ref => this.passwordInput = ref}
                                            label={'loginScreen.password'} 
                                            value={this.props.state.password} 
                                            secureTextEntry={true} 
                                            onChangeText={(text) => this.props.actions.loginSetPassword(text)}
                                            returnKeyType={"next"}
                                            blurOnSubmit={true}
                                        />}
                                        <Text style={styles.errorStyle}>{this.props.state.errorMessage}</Text>
                                        <View style={styles.buttonContainerStyle}>
                                            <Button
                                                label={this.props.state.screenMode.buttonLabel}
                                                onPress={this.props.state.screenMode.buttonOnPress}
                                            />
                                        </View >
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
                                        <Text style={styles.modelTextStyle} onPress={this.props.state.screenMode.leftTextOnPress} >
                                            {i18n.t(this.props.state.screenMode.leftTextLabel)}
                                        </Text>
                                        {this.props.state.screenMode.rightTextLabel && 
                                            <Text style={styles.modelTextStyle} onPress={this.props.state.screenMode.rightTextOnPress} >
                                                {i18n.t(this.props.state.screenMode.rightTextLabel)}
                                            </Text>} 
                                    </View>
                                </View>
                            </ScrollView>
                            )}
                        </KeyboardShift>
                    </LinearGradient>
                </View>
            </TouchableWithoutFeedback>
            
        )
    }
}
