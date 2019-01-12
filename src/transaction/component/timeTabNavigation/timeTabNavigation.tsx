
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import NavigationService from '../../../shared/service/navigation/navigation.service';
import appConstants from '../../../appConstants';
import { LinearGradient } from 'expo';

export class TimeTabNavigation extends Component<ITimeTabNavProp> {
    isSelectedTab(timeMode: string) {
        if(this.props.timeMode === timeMode) {
            return styles.selectedTab;
        } else { 
            return null;
        }

        
    }
    render() {
        console.log('[[TimeTabNavigation]]', this.props);
        const { changeTimeFormat } = this.props;
        return (
                <LinearGradient
                    start={{ x: 0.0, y: 0.2 }}
                    end={{ x: 0.75, y: 1.0 }}
                    locations={[0, 0.5, 0.9]}
                    colors={['#3D1C47C5', '#1C47C5', '#B93434']}
                    style={styles.mainViewStyle}>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.day)]}
                    onPress={() => changeTimeFormat(appConstants.timeMode.day) }>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Day
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.week)]}
                    onPress={() => changeTimeFormat(appConstants.timeMode.week)}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Week
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.month)]} 
                    onPress={() => changeTimeFormat(appConstants.timeMode.month)}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Month
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.year)]} 
                    onPress={() => changeTimeFormat(appConstants.timeMode.year)}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Year
                        </Text>
                    </View>
                </TouchableOpacity>  
                </LinearGradient>
        );
    }
}

const styles = {
    mainViewStyle: {
        height: 50,
        flexDirection: 'row',
        shadowOpacity: 0.6,
        shadowOffset: { height: 4, width: 0 },

    },
    touchableStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        
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
    },
    linearGradient: {
        flex: 1
    },
    selectedTab: {
        borderBottomColor: 'red',
        borderBottomWidth: 5
    }

};

export interface ITimeTabNavProp {
    timeMode: string;
    changeTimeFormat: (timeMode: string) => void;
}