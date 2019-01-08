import React, { Component } from 'react';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import styles from './splash.component.style';
import appConstants from '../appConstants';
import { ISplashProp } from './splash.model';
import { Spinner } from '../shared/components/common/Spinner';

export default class Splash extends Component<ISplashProp> {
    componentWillMount() {
        this.props.actions.initializeStart();
    }
    render() {
        return(
            <ImageBackground source={require('../../assets/images/splashBack.jpg')} style={styles.backgroundImage}>
            {!this.props.state.isInitialized && <Spinner></Spinner>}
            </ImageBackground>
        )  
    }
}
