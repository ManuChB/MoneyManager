
import React, { Component } from 'react';
import { TextInput, View, Animated } from 'react-native';

export class Input extends Component<IImputProp> {
    _animatedIsFocused = new Animated.Value(0);

    render() {
        const { label, value, onChangeText, placeHolder,
            secureTextEntry, keyboard, capitalize, inputRef, returnKeyType,
            onSubmitEditing, blurOnSubmit } = this.props;
        
        const conf = {
            labelFontSizeInactive: 16,
            labelFontSizeActive: 14,
            labelTopInactive: 19,
            labelTopActive: 0
        };

        const labelStyle = {
            position: 'absolute',
            backgroundColor: 'transparent',
            left: 0,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [conf.labelTopInactive, conf.labelTopActive],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [conf.labelFontSizeInactive, conf.labelFontSizeActive],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#D0CDD6', '#909090'],
            }),
            opacity: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1],
            })
        };

        return (
            <View style={styles.containerStyle} >
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    secureTextEntry={secureTextEntry}
                    placeholder={placeHolder}
                    autoCorrect={false}
                    style={styles.inputStyle}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => this.animate(1)}
                    onBlur={() => this.animate(value ? 1 : 0)}
                    underlineColorAndroid="transparent"
                    keyboardType={keyboard}
                    autoCapitalize={capitalize}
                    ref={inputRef}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    blurOnSubmit={blurOnSubmit}
                />
            </View>
        );

        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value){
            this.animate(1);
        }
    }

    animate(active) {
        Animated.timing(this._animatedIsFocused, {
            toValue: active ? 1 : 0,
            duration: 200,
        }).start();
    }

}

const styles = {
    inputStyle: {
        height: 25,
        lineHeight: 25,
        fontSize: 20,
        paddingBottom: 5,
        paddingLeft: 0,
        color: '#414141',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    containerStyle: {
        paddingTop: 20,
        paddingBottom: 20,
        margin: 10,
        height: 60,
        borderBottomWidth: 0
    }
    
};

export interface IImputProp {
    label?: string,
    value?: string,
    onChangeText?: (text: string) => void,
    placeHolder?: string,
    secureTextEntry?: boolean,
    keyboard?: string,
    capitalize?: string,
    returnKeyType?: string,
    blurOnSubmit?: boolean,
    onSubmitEditing? ,
    inputRef?
}