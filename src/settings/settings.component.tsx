import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ISettingsProp } from './settings.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import appConstants from '../appConstants';
import { LinearGradient } from 'expo-linear-gradient';
import I18n, {
    languages,
    defaultLanguage
} from '../shared/service/i18n';
import { Loc, setLocale } from 'react-native-redux-i18n';
import { DataPicker } from '../shared/components/common/DataPicker';

export default class Settings extends Component<ISettingsProp> {

    setLanguage(language) {
        this.props.actions.settingsSetCurrentLanguage(language);
        this.props.dispatch(setLocale(language.code));
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Loc locKey={'settingsScreen.settings'}></Loc>
                <DataPicker label={'settingsScreen.language'}
                    value={this.props.state.currentLanguage.name}
                    data={languages}
                    onSelect={(lang) => this.setLanguage(lang)}>
                </DataPicker>
                
            </View>
        )
    }
}
