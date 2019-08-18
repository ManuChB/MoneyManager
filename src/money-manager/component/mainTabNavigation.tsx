
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { IMoneyManagerProp } from '../money-manager.model';
import appConstants from '../../appConstants';
import { Loc } from 'react-native-redux-i18n';

export class MainTabNavigation extends Component<IMoneyManagerProp> {
    isSelectedTab(tabMode: string) {
        if (this.props.state.tabMode === tabMode) {
            return styles.selectedTab;
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.tabMode.transaction) ]}
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.transaction)}>
                    <View style={styles.touchableViewStyle}>
                        <Image style={styles.image} source={require('../../../assets/images/transaction-50.png')} />
                        <Text
                            style={styles.touchableTextStyle}>
                            <Loc locKey={'mainTabNav.transactions'}></Loc>
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.tabMode.report) ]}
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.report)}>
                    <View style={styles.touchableViewStyle}>
                        <Image style={styles.image} source={require('../../../assets/images/report-80.png')} />
                        <Text
                            style={styles.touchableTextStyle}>
                            <Loc locKey={'mainTabNav.report'}></Loc>
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.tabMode.account) ]} 
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.account)}>
                    <View style={styles.touchableViewStyle}>
                        <Image style={styles.image} source={require('../../../assets/images/account-50.png')} />
                        <Text
                            style={styles.touchableTextStyle}>
                            <Loc locKey={'mainTabNav.accounts'}></Loc>
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.tabMode.settings) ]}
                    onPress={() => this.props.actions.moneyManagerTabModeChange(appConstants.tabMode.settings)}>
                    <View style={styles.touchableViewStyle}>
                        <Image style={styles.image} source={require('../../../assets/images/settings-64.png')} />
                        <Text
                            style={styles.touchableTextStyle}>
                            <Loc locKey={'mainTabNav.settings'}></Loc>
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
        backgroundColor: 'white'
    },
    touchableStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#9ad1ed',
        borderTopColor: '#1379a3',
        borderTopWidth: 0 
    },
    touchableViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableTextStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    selectedTab: {
        borderTopColor: '#68bde8',
        borderTopWidth: 5,
        shadowOffset: {
            width: 10,
            height: 30,
        },
        shadowColor: 'black',
        elevation: 30
    },
    image: { 
        width: 20, 
        height: 20, 
        tintColor: 'white' 
    }

};

export interface IMainTabNavProp {
    tabMode?: string
}