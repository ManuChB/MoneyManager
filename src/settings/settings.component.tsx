import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ISettingsProp } from './settings.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import appConstants from '../appConstants';
import { LinearGradient } from 'expo-linear-gradient';
import i18n, {languages } from '../shared/service/i18n';
import { DataPicker } from '../shared/components/common/DataPicker';

export default class Settings extends Component<ISettingsProp> {

    setLanguage(language) {
        this.props.setLanguage(language.code);
        this.props.actions.settingsSetCurrentLanguage(language);
    }
    
    logOut() {
        this.props.actions.logOut();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DataPicker label={'settingsScreen.language'}
                    value={this.props.state.currentLanguage.name}
                    data={languages}
                    onSelect={(lang) => this.setLanguage(lang)}>
                </DataPicker>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginBottom: 20}}>
                    <Button
                        customButtonStyle={{
                            height: 50,
                            borderColor: '#F38266', backgroundColor: '#F38266' }}
                        onPress={() => this.logOut()}
                        label={'settingsScreen.logOut'}>
                    </Button>
                </View>
            </View>
        )
    }
}
