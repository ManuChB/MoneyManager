import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import i18n from '../../service/i18n';
import _ from 'lodash';

export class Button extends Component<IButtonProps> {

    debouncedOnPress = () => {
        this.props.onPress && this.props.onPress();
    }


    render() {
        const { label, buttonRef, customButtonStyle, customLabelStyle, disabled, dontTranslate, icon } = this.props;
        return (
            <TouchableOpacity 
                onPress={ _.debounce(this.debouncedOnPress, 300, { leading: true, trailing: false }) } 
                style={[styles.buttonStyle, customButtonStyle, disabled ? styles.disabled : null ]}
                ref={buttonRef}
                disabled={disabled}
            >
                {label && <Text style={[styles.textStyle, customLabelStyle]}>
                    {dontTranslate ? label : i18n.t(label)}
                </Text>}
                {icon && <Image style={styles.imageStyle} source={icon} />}
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

    },
    imageStyle: {
        width: 20, 
        height: 20,
        tintColor: 'white'
    }
};

export interface IButtonProps {
    label?: string,
    customButtonStyle?: Object,
    customLabelStyle?: Object,
    onPress?: () => void,
    buttonRef?: (ref: string) => void,
    disabled?: boolean,
    dontTranslate?: boolean,
    icon?: any

}
