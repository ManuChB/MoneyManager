import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ISettingsProp } from './settings.model';
import { Button, Input, Header, Spinner } from '../shared/components/common';
import appConstants from '../appConstants';
import { LinearGradient } from 'expo-linear-gradient';
import { actionsI18n, languages } from '../shared/service/i18n';
import { Loc } from 'redux-react-native-i18n';
import { DataPicker } from '../shared/components/common/DataPicker';

export default class Settings extends Component<ISettingsProp> {


    
    render() {
        

        return (
            <View style={{ flex: 1 }}>
                <Loc locKey={'settingsScreen.settings'}></Loc>
                <DataPicker label={'accountDetail.type'}
                    value={'this.props.dispatch(actionsI18n.g)'}
                    data={languages}
                    onSelect={(lang) => this.props.dispatch(actionsI18n.setCurrentLanguage(lang.code))}>
                </DataPicker>
                <Button
                    customButtonStyle={{ flex: 1, borderColor: '#F38266', backgroundColor: '#F38266' }}
                    onPress={() => this.props.dispatch(actionsI18n.setCurrentLanguage('en'))}
                    label={'EN'}>
                </Button>
                <Button
                    customButtonStyle={{ flex: 1 }}
                    onPress={() => this.props.dispatch(actionsI18n.setCurrentLanguage('es'))}
                    label={'ES'}>
                </Button>
            </View>
        )
    }
}
