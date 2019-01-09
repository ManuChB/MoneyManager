import React, { StatelessComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const Modal: StatelessComponent = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.screenBlocker}></View>
            <ScrollView style={styles.modalStyle}>
                {props.children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        elevation: 4,
        position: 'absolute',
        zIndex: 100
    },
    screenBlocker: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        shadowOpacity: 2,
    },
    modalStyle: {
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        shadowOpacity: 10,
        elevation: 5,
        position: 'absolute'
    }
});

export {Modal};


