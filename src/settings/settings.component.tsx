import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ISettingsProp } from './settings.model';
import { Button } from '../shared/components/common';

import {languages } from '../shared/service/i18n';
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
                <DataPicker 
                    dontTranslate={true}
                    label={'settingsScreen.mainCurrency'}
                    value={this.props.state.currency ? this.props.state.currency.name : ''}
                    data={this.props.state.currencyList}
                    onSelect={(currency) => this.props.actions.settingsSetCurrentCurrency(currency)}>
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
