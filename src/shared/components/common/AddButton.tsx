import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Button } from './Button';

export class AddButton extends Component<IAddButtonProps> {

    render() {
        const { onPress, customButtonStyle, customLabelStyle } = this.props;
        return (
            <Button
                customButtonStyle={[styles.buttonStyle, customButtonStyle]}
                customLabelStyle={[styles.labelStyle, customLabelStyle]} onPress={onPress}
                label={'+'}
                dontTranslate={true}>
            </Button>
        )
    }

}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 60,
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 100
    },
    labelStyle: {
        fontSize: 50,
        fontWeight: '900',
        textAlign: 'center',
        marginLeft: 0,
        marginBottom: 5
    }
})

export interface IAddButtonProps {
    customButtonStyle?: Object,
    customLabelStyle?: Object,
    onPress?: () => void,

}