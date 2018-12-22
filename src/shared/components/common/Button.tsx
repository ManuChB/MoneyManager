import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export class Button extends Component<IButtonProps> {

    render() {
        const { onPress, label, buttonRef } = this.props;
        return (
            <TouchableOpacity 
                onPress={onPress} 
                style={styles.buttonStyle}
                ref={buttonRef}
            >
                <Text style={styles.textStyle}>{label} </Text>
            </TouchableOpacity>
        )
    }
        
}

const styles = {
    textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#F38266',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#F13203',
        marginLeft: 20,
        marginRight: 20,
        height: 60
    }
};

export interface IButtonProps {
    label?: string,
    onPress?: () => void,
    buttonRef?: (ref: string) => void

}
