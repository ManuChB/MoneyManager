import React, { Component } from 'react';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import styles from './splash.component.style';
import appConstants from '../appConstants';
import { ISplashProp } from './splash.model';
import { Spinner } from '../shared/components/common/Spinner';
import { LinearGradient } from 'expo-linear-gradient';

export default class Splash extends Component<ISplashProp> {
    componentWillMount() {
        this.props.actions.initializeStart();
    }
    render() {
        return(
            <LinearGradient
                start={{ x: 0.0, y: 0.2 }}
                end={{ x: 0.75, y: 1.0 }}
                locations={[0, 0.3, 0.7]}
                colors={['#58e8da', '#97A2C4', '#8362d1']} //['#97A2C4', '#CFCD5B', '#350F90']
                style={{ flex: 1}}>
                {!this.props.state.isInitialized && <Spinner></Spinner>}

            </LinearGradient>
            
        )  
    }
}
