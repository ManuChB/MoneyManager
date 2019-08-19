import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment, { Moment } from 'moment';
import { Modal } from '../common/Modal';
import { Calendar } from 'react-native-calendars';
import { Button } from '../common/Button';

export class DatePickerHeader extends Component<IDatePickerProps> {

    componentDidMount() {
        if (this.props.dateMode == 'day') {
            this.setState({ markingType: 'standard' });
        } else {
            this.setState({ markingType: 'period' });

        }

    }

    constructor(props) {
        super(props);
        this.state = { showModal: false, modalDateStart: null, modalDateEnd: null };
    }

    show() {
        const { dateStart, dateEnd } = this.props;
        this.setState({ modalDateStart: dateStart, modalDateEnd: dateEnd });

    }

    changePickerDay(day) {
        let dateStart, dateEnd = null;
        if (this.props.dateMode == 'day') {
            dateStart = moment.utc(new Date(day.timestamp));
        } else if (this.props.dateMode == 'week') {
            dateStart = moment.utc(new Date(day.timestamp)).startOf('isoWeek');
            dateEnd = moment.utc(new Date(day.timestamp)).endOf('isoWeek');
        } else if (this.props.dateMode == 'month') {
            dateStart = moment.utc(new Date(day.timestamp)).startOf('month');
            dateEnd = moment.utc(new Date(day.timestamp)).endOf('month');
        }
        this.setState({ modalDateStart: dateStart, modalDateEnd: dateEnd });
    }

    getMarkers() {
        const { dateMode } = this.props;
        const { modalDateStart, modalDateEnd } = this.state;
        const modalDateStartCopy = modalDateStart ? modalDateStart.clone() : null;
        const modalDateEndCopy = modalDateEnd ? modalDateEnd.clone() : null;

        let markers = {};
        if (dateMode == 'day' && modalDateStartCopy) {
            markers = {
                [modalDateStartCopy.format('YYYY-MM-DD')]: { selected: true, color: '#99d7e0' },
            }
        } else if (modalDateEndCopy && modalDateStartCopy){
            const start = modalDateStartCopy.format('YYYY-MM-DD');
            const end = modalDateEndCopy.format('YYYY-MM-DD');

            markers = {
                [start]: { selected: true, startingDay: true, color: '#99d7e0' },
                [end]: { selected: true, endingDay: true, color: '#99d7e0' }
            }

            var date = start;
            var i = 1;
            while (end != date) {
                date = modalDateStartCopy.add(i, 'day').format('YYYY-MM-DD').toString();
                if (date != end) {
                    markers[date] = { selected: true, startingDay: false, endingDay: false, color: '#99d7e0' };
                }
            }
        }        
        return markers;
    }

    showModal() {
        const { changeDay, dateMode } = this.props;
        const month = dateMode == 'month' ? 'month' : 'day';
        const markers = this.getMarkers();
        return (
            <Modal hideClose={true}>
                <View style={{flex: 1 }}>
                    <Calendar
                        markedDates={markers}
                        markingType={this.state.markingType}
                        onDayPress={(day) => { console.log('selected day', day); this.changePickerDay(day) }}
                        monthFormat={'MMMM yyyy'}
                        onMonthChange={(month) => { console.log('month changed', month) }}
                        firstDay={1}
                        showWeekNumbers={false}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        theme={{
                            'stylesheet.day.period': {
                                base: {
                                    overflow: 'hidden',
                                    height: 34,
                                    alignItems: 'center',
                                    width: 38,
                                }
                            }
                        }}

                    />
                    <View style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        bottom: 0,
                        marginBottom: 10
                    }}>
                        <Button
                            customButtonStyle={{ flex: 1, borderColor: '#F38266', backgroundColor: '#F38266' }}
                            onPress={() => this.setState({ showModal: false })}
                            label={'common.button.cancel'}>
                        </Button>
                        <Button
                            customButtonStyle={{ flex: 1 }}
                            onPress={() => { this.setState({ showModal: false }); changeDay(this.state.modalDateStart) }}
                            label={'common.button.save'}>
                        </Button>
                    </View>

                </View>
            </Modal>
        )
    }

    getMode() {
        return !this.state.showModal ? this.showPicker() : this.showModal()
    }

    render() {
        return ( this.getMode() )
    }

    showPicker() {
        const { dateStart, changeDay, dateMode, dateFormat } = this.props;
        const month = dateMode == 'month' ? 'month' : dateMode == 'week' ? 'week' : 'day';
        return (
            <View style={styles.infoStyle}>
                <View style={styles.textViewStyle}>
                    <TouchableOpacity
                        onPress={() => { changeDay(moment(dateStart).subtract(1, month)) }}
                        style={{ padding: 15 }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/images/left-50.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 90, alignItems: 'center' }}
                        onPress={() => { this.show(); this.setState({ showModal: true })}}>
                        <Text>{this.getPickerText().toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { changeDay(moment(dateStart).add(1, month)) }}
                        style={{ padding: 15 }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/images/right-50.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    getPickerText() {
        const { dateStart, dateEnd, dateMode, dateFormat } = this.props;
        let text = 'No date';
        if(dateMode == 'day' && dateStart){
            text = dateStart.format('DD MMM YYYY').toString();
        }
        else if(dateStart && dateEnd && dateMode == 'week'){
            if (dateStart.year() == dateEnd.year() && dateStart.month() == dateEnd.month()){
                text = dateStart.format('DD').toString() + " to " + dateEnd.format('DD MMM YYYY').toString();
            }
            else if (dateStart.year() == dateEnd.year() && dateStart.month() != dateEnd.month()) {
                text = dateStart.format('DD MMM').toString() + " to " + dateEnd.format('DD MMM YYYY').toString();
            }
            else if(dateStart.year() != dateEnd.year()) {
                text = dateStart.format('DD MMM YYYY').toString() + " to " + dateEnd.format('DD MMM YYYY').toString();
            }
            text = dateStart.format('DD MMM YYYY').toString() + "\n" + dateEnd.format('DD MMM YYYY').toString();

        }
        else if (dateStart && dateEnd && dateMode == 'month'){
            text = dateStart.format('MMM YYYY').toString();
        }
        return text;
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
    dateStart?: Moment,
    dateEnd?: Moment,
    dateMode?: string,
    changeDay?: (date: any) => void,
    dateFormat?: string
}
