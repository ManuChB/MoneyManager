import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class DatePicker extends Component<IDatePickerProps> {

    render() {
        const { income, expense, balance } = this.props;
        return (
            <View style={styles.infoStyle}>
                <View style={styles.textViewStyle}>
                    <Text style={styles.textStyle}>{'income'} </Text>
                    <Text style={[styles.textStyle, { color: 'green' }]}>{income} </Text>
                </View>
                <View style={styles.textViewStyle}>
                    <Text style={styles.textStyle}>{'expense'} </Text>
                    <Text style={[styles.textStyle, { color: 'red' }]}>{expense} </Text>
                </View>
                <View style={styles.textViewStyle}>
                    <Text style={styles.textStyle}>{'balance'} </Text>
                    <Text style={[styles.textStyle, parseFloat(balance) > 0 ? { color: 'green' } : { color: 'red' }]}>{balance} </Text>
                </View>
            </View>
        )
    }

}

const styles = {
    textViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    textStyle: {
        color: 'black',
        fontSize: 12

    },
    infoStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'white',
        height: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    }
};

export interface IDatePickerProps {
    currentDate?: string,
    dateMode?: string,
}
