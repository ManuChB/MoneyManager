
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import NavigationService from '../../shared/service/navigation/navigation.service';
import appConstans from '../../appConstants';

export class TimeTabNavigation extends Component<ITimeTabNavProp> {

    render() {
        console.log('[[TimeTabNavigation]]', this.props);

        return (
            <View style={styles.mainViewStyle}>
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => console.log('Day') }>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Day
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => console.log('Week')}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Week
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableStyle} 
                    onPress={() => console.log('Month')}>
                    <View style={styles.touchableViewStyle}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Month
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableStyle}>
                    <View style={styles.touchableViewStyle}
                        onPress={() => console.log('Year')}>
                        <Text
                            style={styles.touchableTextStyle}>
                            Year
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

export interface ITimeTabNavProp {

}