
import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeHolder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={containerStyle} >
            <Text style={labelStyle} > {label} </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeHolder={placeHolder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid="transparent"
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18
    },
    label: {
        fontSize: 18,
        paddingLeft: 20,
    },
    containerStyle: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        margin: 10,
        height: 60,
        alignItems: 'center',
        borderBottomWidth: 1
    }
    
};

export { Input };
