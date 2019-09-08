import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Share, ScrollView  } from 'react-native';
import qs from 'qs';

import { ISettingsProp } from './settings.model';
import { Button, AdMob } from '../shared/components/common';
import {languages } from '../shared/service/i18n';
import { DataPicker } from '../shared/components/common/DataPicker';
import i18n from '../shared/service/i18n';
import styles from './settings.component.style';

export default class Settings extends Component<ISettingsProp> {

    setLanguage(language) {
        this.props.setLanguage(language.code);
        this.props.actions.settingsSetCurrentLanguage(language);
    }
    
    logOut() {
        this.props.actions.logOut();
    }

    sendFeedback() {
        const subject = 'settingsScreen.feedback.subject';
        const body = 'settingsScreen.feedback.body';
        this.sendEmail(subject, body);
    }

    sendMistranslation() {
        const subject = 'settingsScreen.mistranslation.subject';
        const body = 'settingsScreen.mistranslation.body';
        this.sendEmail(subject, body);
    }

    async sendEmail(subject: string, body: string) {
        try {
            let url = `mailto:test@gmail.com`;
            const query = qs.stringify({
                subject: i18n.t(subject),
                body: i18n.t(body)
            });
            if (query.length) {
                url += `?${query}`;
            }
            const canOpen = await Linking.canOpenURL(url);
            if (!canOpen) {
                throw new Error('Provided URL can not be handled');
            }
            await Linking.openURL(url);
        } catch (e) {
            console.log(`[error][settings][][sendMail]>>> ${e}`);
        }
    }

    share() {
        
        Share.share({
            message: 'settingsScreen.share.message',
            url: 'https://play.google.com/store/apps/details?id=com.supercell.clashroyale&hl=en',
            title: 'settingsScreen.share.title'
        }, {
                // Android only:
                dialogTitle: 'Share MoneyManager goodness',

            })
    }

    async review() {
        let url = `market://details?id=com.supercell.clashroyale`;
        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }
        await Linking.openURL(url);
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, heigth: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <DataPicker label={'settingsScreen.language'}
                    value={this.props.state.currentLanguage.name}
                    data={languages}
                    onSelect={(lang) => this.setLanguage(lang)}>
                </DataPicker>
                <DataPicker 
                    dontTranslate={true}
                    label={'settingsScreen.mainCurrency'}
                    value={this.props.state.currency ? this.props.state.currency.nameWithSymbol : ''}
                    fieldToShow={'nameWithSymbol'}
                    data={this.props.state.currencyList}
                    onSelect={(currency) => this.props.actions.settingsSetCurrentCurrency(currency)}>
                </DataPicker>
                <TouchableOpacity
                    style={styles.feedback}
                    onPress={() => this.sendFeedback()}>
                    <Text style={styles.feedbackText} >
                        {i18n.t('settingsScreen.feedback.label')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.feedback}
                    onPress={() => { this.share() }}>
                    <Text style={styles.feedbackText} >
                        {i18n.t('settingsScreen.share.label')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.feedback}
                    onPress={() => { this.sendMistranslation() }}>
                    <Text style={styles.feedbackText} >
                        {i18n.t('settingsScreen.mistranslation.label')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.feedback}
                    onPress={() => { this.review() }}>
                    <Text style={styles.feedbackText} >
                        {i18n.t('settingsScreen.review.label')}
                    </Text>
                </TouchableOpacity>
                <View style={styles.logOut}>
                    <Button
                        customButtonStyle={{
                            height: 50,
                            borderColor: '#F38266', backgroundColor: '#F38266' }}
                        onPress={() => this.logOut()}
                        label={'settingsScreen.logOut'}>
                    </Button>
                </View>
                <View style={{ bottom: 0, height: 90}}>
                    <AdMob type={'banner'}></AdMob>
                </View>
            </ScrollView>
        )
    }
}
