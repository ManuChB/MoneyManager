import React, { Component } from 'react';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import styles from './splash.component.style';
import appConstants from '../appConstants';
import { ISplashProp } from './splash.model';

export default class Splash extends Component<ISplashProp> {
    componentDidMount() {
        console.log('Splash[componentDidMount]', this.props);
    }
    render() {
        return(
            <ImageBackground source={require('../../assets/images/splashBack.jpg')} style={styles.backgroundImage}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => { this.props.actions.initializeStart()}}>
                        <Text style={styles.title}>{'appConstants.splashTitle'}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )  
    }
}
