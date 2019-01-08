import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modal } from './';

export class CustomPicker extends Component<IPickerProps> {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    getMode() {
        const { data } = this.props;

        const mode = !this.state.showModal ?
            <TouchableOpacity onPress={() => this.setState({ showModal: true })}><Text>PIKER</Text></TouchableOpacity> :
            <Modal onRequestClose={() => this.setState({ showModal: false })}>
                {data && data.map((data, key) => {
                    return (
                        <View key={key} >
                            <Text key={key}>{`Category: ${data.id}`}</Text>
                            <View style={{
                                flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
                                alignItems: 'center'}}>
                                {data.types.map((element, key) => {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                height: 100, width: 100, borderWidth: 2, borderColor: 'black', justifyContent: 'center',
                                                alignItems: 'center', margin: 5, borderRadius: 10,}}
                                            key={key}
                                            onPress={() => this.setState({ showModal: false })}>
                                            <Text>{element}</Text>
                                        </TouchableOpacity>)
                                })}
                            </View>
                        </View>
                    )
                })}
            </Modal>
        return mode;
    }
    render() {
        console.log('[customPicker]>>', this.props, '-------',this.state);
        return (
            this.getMode()
        )
    }
}

const styles = StyleSheet.create({
   
});

export interface IPickerProps {
    label?: string,
    customPickerStyle?: Object,
    customLabelStyle?: Object,
    onSelect?: () => void,
    ref?: (ref: string) => void,
    data: Array<any>,
    showModal: boolean
}

