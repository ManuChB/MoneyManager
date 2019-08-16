import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ISettingsProp } from './settings.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import appConstants from '../appConstants';
import { LinearGradient } from 'expo-linear-gradient';
import I18n from '../i18n';

export default class Settings extends Component<ISettingsProp> {


    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Settings!</Text>
            </View>
        )
    }
}
