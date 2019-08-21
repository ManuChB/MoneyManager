
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import appConstants from '../../../appConstants';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '../../../shared/service/i18n';

export class TimeTabNavigation extends Component<ITimeTabNavProp> {
    isSelectedTab(timeMode: string) {
        if(this.props.timeMode === timeMode) {
            return styles.selectedTab;
        } else { 
            return null;
        }   
    }
    
    render() {
        const { changeTimeFormat } = this.props;
        return (
            <View  style={styles.mainViewStyle}>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.day)]}
                    onPress={() => changeTimeFormat(appConstants.timeMode.day) }>
                    <View style={styles.touchableViewStyle}>
                        <Text style={styles.touchableTextStyle}>
                            {i18n.t('timeTab.day')}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.week)]}
                    onPress={() => changeTimeFormat(appConstants.timeMode.week)}>
                    <View style={styles.touchableViewStyle}>
                        <Text style={styles.touchableTextStyle}>
                            {i18n.t('timeTab.week')}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.month)]} 
                    onPress={() => changeTimeFormat(appConstants.timeMode.month)}>
                    <View style={styles.touchableViewStyle}>
                        <Text style={styles.touchableTextStyle}>
                            {i18n.t('timeTab.month')}
                        </Text>
                    </View>
                </TouchableOpacity>
                {/**<TouchableOpacity
                    style={[styles.touchableStyle, this.isSelectedTab(appConstants.timeMode.year)]} 
                    onPress={() => changeTimeFormat(appConstants.timeMode.year)}>
                    <View style={styles.touchableViewStyle}>
                        <Text style={styles.touchableTextStyle}>
                             <Loc locKey={'timeTab.year'}></Loc>
                        </Text>
                    </View>
                </TouchableOpacity>   */}
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
        backgroundColor: '#3ca8cf',
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
    linearGradient: {
        flex: 1
    },
    selectedTab: {
        borderBottomColor: '#2c809e',
        borderBottomWidth: 5,
        shadowOffset: {
            width: 10,
            height: 30,
        },
        shadowColor: 'black',
        elevation: 30
    }

};

export interface ITimeTabNavProp {
    timeMode: string;
    changeTimeFormat: (timeMode: string) => void;
}