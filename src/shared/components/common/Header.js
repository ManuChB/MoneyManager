import React from 'react';
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native';

const Header = (props) => (
        <View style={styles.viewStyle}>
            <StatusBar barStyle="light-content" hidden={false} translucent={false} />
        </View>
    );

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 22,
    },
    viewStyle: {
        backgroundColor: "#68bde8",
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    }
});

export { Header };
