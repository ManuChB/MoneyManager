import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment, { Moment } from 'moment';

export class DatePickerHeader extends Component<IDatePickerProps> {

    render() {
        const { date, changeDay } = this.props;
        console.log('DATE: ', date)
        return (
            <View style={styles.infoStyle}>
                <View style={styles.textViewStyle}>
                    <TouchableOpacity 
                        onPress={() => { changeDay(moment(date, "DD-MM-YYYY").subtract(1, 'day').format("DD-MM-YYYY").toString()) }}
                        style={{ padding: 15 }}>
                        <Text>{'<'}</Text>
                    </TouchableOpacity>
                    <DatePicker
                    style= {{width: 80}}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        showIcon={false}
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateInput: {
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date) => changeDay(date.toString()) }
                    />
                    <TouchableOpacity 
                        onPress={() => { changeDay(moment(date, "DD-MM-YYYY").add(1, 'day').format("DD-MM-YYYY").toString())}} 
                        style={{ padding: 15 }}>
                        <Text>{'>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = {
    textViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: 'black',
        fontSize: 12

    },
    infoStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        borderBottomWidth: 1
    }
};

export interface IDatePickerProps {
    date?: string,
    dateMode?: string,
    changeDay?: (date: any) => void
}
