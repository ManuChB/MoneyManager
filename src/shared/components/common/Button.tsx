import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export class Button extends Component<IButtonProps> {

    render() {
        const { onPress, label, buttonRef, customButtonStyle, customLabelStyle } = this.props;
        return (
            <TouchableOpacity 
                onPress={onPress} 
                style={[styles.buttonStyle, customButtonStyle ]}
                ref={buttonRef}
            >
                <Text style={[styles.textStyle, customLabelStyle]}>{label} </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#F38266',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#F38266',
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        shadowOpacity: 0.6,
        shadowOffset: { height: 4, width: 0 },
    }
};

export interface IButtonProps {
    label?: string,
    customButtonStyle?: Object,
    customLabelStyle?: Object,
    onPress?: () => void,
    buttonRef?: (ref: string) => void

}
