import React, { Component } from 'react';
import { Modal, View, Text, ScrollView } from 'react-native';
import { Button, Input } from '../../../shared/components/common';
import appConstans from '../../../appConstants';
import styles from './new-transaction-modal.component.style';
import I18n from '../../../i18n';
import { ITransactionDetailProp } from './new-transaction-modal.model';
import { DatePickerHeader}  from '../../../shared/components/date-picker/date-picker.component';

export default class TransactionDetail extends Component<ITransactionDetailProp> {

    changeDay(date) {
        console.log('------------------changeDay----------------------', this.props);

        this.props.actions.changeData({ ...this.props.state.data, date })
    }
    render() {
        const { data, onClose, onSave } = this.props.state;
        return (
            <View style={styles.mainView}>
                <View style={styles.screenBlocker}></View>
                <ScrollView style={styles.modalStyle}>
                    <View style={{ }}>
                        <DatePickerHeader date={data.date} changeDay={this.changeDay.bind(this)} ></DatePickerHeader>
                        <Text>Account!</Text>
                        <Text>ExpenceType!</Text>
                        <Input
                            inputRef={ref => this.descriptionInput = ref}
                            label={'Description'}
                            value={data.description}
                            onChangeText={(text) => {data.description = text;}}
                            returnKeyType={"next"}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.valueInput.focus()}
                        />
                        <Input
                            inputRef={ref => this.valueInput = ref}
                            label={'Value'}
                            value={data.value ? data.value.toString() : null}
                            onChangeText={(value) => this.props.actions.changeData({ ...data, value})}
                            returnKeyType={"next"}
                            keyboard={'numeric'}
                            blurOnSubmit={true}
                        />

                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Button customButtonStyle={{flex: 1}} onPress={onClose} label={'Cancel'}></Button>
                        <Button customButtonStyle={{flex: 1}} onPress={onSave} label={'Save'}></Button>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

