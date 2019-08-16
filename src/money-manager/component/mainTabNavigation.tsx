
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import NavigationService from '../../shared/service/navigation/navigation.service';
import appConstants from '../../appConstants';

export class MainTabNavigation extends Component<IMainTabNavProp> {

    render() {

        return (
            <View style={styles.mainViewStyle}>
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.transaction)}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Transactions
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.report)}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Report
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableStyle} 
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.account)}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Accounts
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.settings)}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Settings
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );


    }


}

const styles = {
    mainViewStyle: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowOpacity: 0.6,
        shadowOffset: { height: 4, width: 0 },

    },
    touchableStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#c2e2ef',
        borderTopColor: '#1379a3',
        borderTopWidth: 1
    },
    touchableViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableTextStyle: {
        textAlign: 'center',
        color: 'white',
        marginTop: 5
    }

};

export interface IMainTabNavProp {

}