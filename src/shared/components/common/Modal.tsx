import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from './Button';

export class Modal extends Component<IModalProp> {
    render() {
        const { closeModal, hideClose } = this.props;

        return(
            <View style={styles.mainView}>
                <View style={styles.screenBlocker}></View>
                
                <ScrollView style={styles.modalStyle} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                    { !hideClose &&<Button
                        customButtonStyle={styles.customButtonStyle}
                        customLabelStyle={styles.customLabelStyle} onPress={() => closeModal() }
                        label={'X'}
                        dontTranslate={true}>
                    </Button>}
                    {this.props.children}
                </ScrollView>
            </View>
        )
    }
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
        position: 'absolute',
        borderRadius: 17
    },
    customButtonStyle: {
        width: 35,
        height: 35,
        zIndex: 200,
        position: 'absolute',
        right: 0,
        top: 0,
        elevation: 5,
        marginLeft: 0,
        marginRight:0,
        borderColor: '#F38266', 
        backgroundColor: '#F38266'
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
    hideClose?: boolean
}

