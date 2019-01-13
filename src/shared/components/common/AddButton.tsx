import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Button } from './Button';

export class AddButton extends Component<IAddButtonProps> {

    render() {
        const { onPress } = this.props;
        return (
            <Button
                customButtonStyle={styles.customButtonStyle}
                customLabelStyle={styles.customLabelStyle} onPress={onPress}
                label={'+'}>
            </Button>
        )
    }

}

const styles = StyleSheet.create({
    customButtonStyle: {
        width: 60,
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 100
    },
    customLabelStyle: {
        fontSize: 50,
        fontWeight: '900',
        textAlign: 'center',
        marginLeft: 13,
        marginBottom: 5
    }
})

export interface IAddButtonProps {
    customButtonStyle?: Object,
    customLabelStyle?: Object,
    onPress?: () => void,

}