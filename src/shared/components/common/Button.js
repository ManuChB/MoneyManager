import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>{props.children} </Text>
        </TouchableOpacity>
    );

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

export { Button };
