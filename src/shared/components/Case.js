import React, { Component } from 'react';
import { View, Text } from 'react-native';

import I18n from '../i18n';


class Case extends Component {
    render() {
        return (
            <View>
                <Text> {I18n.t('case')} </Text>
            </View>
        )
    }
}

export default Case;