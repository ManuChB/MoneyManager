import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment, { Moment } from 'moment';

export class DatePickerHeader extends Component<IDatePickerProps> {

    componentWillUpdate() {
        const { date, changeDay } = this.props;
        if ( !date ) {
            changeDay(moment())
        }
    }
    render() {
        const { date, changeDay, dateMode, dateFormat } = this.props;
        const month = dateMode == 'month' ?'month' : 'day';
        return (
            <View style={styles.infoStyle}>
                <View style={styles.textViewStyle}>
                    <TouchableOpacity 
                        onPress={() => { changeDay(moment(date).subtract(1, month)) }}
                        style={{ padding: 15 }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/images/left-50.png')} />
                    </TouchableOpacity>
                    <DatePicker
                    style= {{width: 80}}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        showIcon={false}
                        format={dateFormat || 'DD-MM-YYYY' }
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateInput: {
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date) => changeDay(moment(date, dateFormat || 'DD-MM-YYYY')) }  
                    />
                    <TouchableOpacity 
                        onPress={() => { changeDay(moment(date).add(1, month)) }} 
                        style={{ padding: 15 }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/images/right-50.png')} />
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
    date?: Moment,
    dateMode?: string,
    changeDay?: (date: any) => void,
    dateFormat?: string
}
