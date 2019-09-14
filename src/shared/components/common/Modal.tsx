import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from './Button';

export class Modal extends Component<IModalProp> {
    render() {
        const { closeModal, hideClose, showBack, onBack, customModal, customButton } = this.props;

        return(
            <View style={styles.mainView}>
                <View style={styles.screenBlocker}></View>
                {!hideClose && <Button
                    customButtonStyle={[styles.customButtonStyle, styles.buttonRight, customButton]}
                    customLabelStyle={styles.customLabelStyle} onPress={() => closeModal()}
                    label={'X'}
                    dontTranslate={true}>
                </Button>}
                {showBack && <Button
                    customButtonStyle={[styles.customButtonStyle, styles.buttonLeft, customButton]}
                    customLabelStyle={styles.customLabelStyle} onPress={() => onBack()}
                    icon={require('../../../../assets/images/left-50.png')}
                    dontTranslate={true}>
                </Button>}
                <ScrollView style={[styles.modalStyle, customModal]} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', marginTop: 35 }} showsVerticalScrollIndicator={false}>
                    
                    {this.props.children}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        elevation: 20,
        position: 'absolute',
        zIndex: 100,
    },
    screenBlocker: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
        elevation: 25,
        position: 'absolute',
        borderRadius: 17
    },
    customButtonStyle: {
        width: 35,
        height: 35,
        zIndex: 200,
        position: 'absolute',
        elevation: 25,
        marginLeft: 0,
        marginRight:0,
        borderRadius: 0
    },
    buttonRight: {
        right: '5%',
        top: '5%',
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 15,
        borderColor: '#F38266',
        backgroundColor: '#F38266'
    },
    buttonLeft: { 
        left: '5%',
        top: '5%', 
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 15,
        borderColor: '#d1db56',
        backgroundColor: '#d1db56'
    
    },
    customLabelStyle: {
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        marginLeft: 0,
        marginBottom: 0
    }
});


export interface IModalProp {
    closeModal?: () => void,
    onBack?: () => void,
    hideClose?: boolean,
    showBack?: boolean,
    customModal?: StyleSheet,
    customButton?: StyleSheet,
}

