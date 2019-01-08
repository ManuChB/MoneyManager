import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modal } from './';

export class CustomPicker extends Component<IPickerProps> {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    getMode() {
        const { data, onSelect } = this.props;

        const mode = !this.state.showModal ?
            <TouchableOpacity onPress={() => this.setState({ showModal: true })}><Text>PIKER</Text></TouchableOpacity> :
            <Modal onRequestClose={() => this.setState({ showModal: false })}>
                {data && data.map((subdata, key) => {
                    return (
                        <View key={key} >
                            <Text key={key}>{`Category: ${subdata.id}`}</Text>
                            <View style={styles.subCategoryView}>
                                {Object.keys(subdata).map((key) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.subCategory}
                                            key={subdata[key].id}
                                            onPress={() => { this.setState({ showModal: false }); onSelect(subdata.id, subdata[key])}}>
                                            <Text>{subdata[key].value}</Text>
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
    subCategoryView: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    subCategory: {
        height: 100, 
        width: 100, 
        borderWidth: 2, 
        borderColor: 'black', 
        justifyContent: 'center',
        alignItems: 'center', 
        margin: 5, 
        borderRadius: 10
    }
});

export interface IPickerProps {
    label?: string,
    customPickerStyle?: Object,
    customLabelStyle?: Object,
    onSelect?: (categoryId: string, subCategory: object) => void,
    ref?: (ref: string) => void,
    data: Array<any>,
    showModal: boolean
}

