import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Loc } from 'react-native-redux-i18n';

export class Button extends Component<IButtonProps> {

    render() {
        const { onPress, label, buttonRef, customButtonStyle, customLabelStyle, disabled, dontTranslate } = this.props;
        return (
            <TouchableOpacity 
                onPress={onPress} 
                style={[styles.buttonStyle, customButtonStyle, disabled ? styles.disabled : null ]}
                ref={buttonRef}
                disabled={disabled}
            >
                <Text style={[styles.textStyle, customLabelStyle]}>
                    {dontTranslate ? label : <Loc locKey={label}></Loc>}
                </Text>
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
        backgroundColor: '#6ddbcc',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#6ddbcc',
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        shadowOpacity: 0.6,
        shadowOffset: { height: 4, width: 0 },
    },
    disabled: {
        backgroundColor: '#c2e8e3',
        borderColor: '#c2e8e3',

    }
};

export interface IButtonProps {
    label?: string,
    customButtonStyle?: Object,
    customLabelStyle?: Object,
    onPress?: () => void,
    buttonRef?: (ref: string) => void,
    disabled?: boolean,
    dontTranslate?: boolean

}
