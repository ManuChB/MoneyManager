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
        backgroundColor: "#3289a8",
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
        
        elevation: 2,
        position: 'relative'
    }
});

export { Header };
