import React from 'react';
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native';

//import { strings } from '../../../i18n';


const Header = (props) => (
        <View >
            <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
                <Text style={styles.textStyle}> {props.headerText} </Text>
        </View>
    );

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
    },
    viewStyle: {
        backgroundColor: Platform.OS === "ios" ? "#F8F8F8" : "#3F51B5",
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    }
});

export { Header };
