import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Animated, TextInput, Image } from 'react-native';
import { Modal } from '.';
import i18n from '../../service/i18n';
import { element } from 'prop-types';

export class DataPicker extends Component<IPickerProps> {
    _animatedIsFocused = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    closeModal(){
        this.setState({ showModal: false });
        if (this.props.onclose) {
            this.props.onclose();
        }
    }

    showModal() {
        const { data, onSelect, dontTranslate, fieldToShow, noHideOnPress, showBackButton, onBack } = this.props;
        const field = fieldToShow || 'name';
        return (
            <Modal closeModal={this.closeModal.bind(this)} showBack={showBackButton} onBack={onBack} >
                {data && data.map((element, key) => {
                    return (
                        <TouchableOpacity
                            style={styles.subCategory}
                            key={key}
                            onPress={() => { 
                                if(!noHideOnPress){ this.setState({ showModal: false }) }; 
                                onSelect(element) 
                            }}>
                            <View style={styles.categoryView} key={key} >
                                <Text style={styles.categoryText} key={key}>
                                    {dontTranslate ? element[field] : i18n.t(element[field]) }
                                </Text>
                            </View>
                        </TouchableOpacity>)
                })}
                {this.props.children}

            </Modal>
        )
    }

    showPicker() {
        const { dontTranslate, onSelect, placeHolder, value, label } = this.props;
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
                outputRange: ['#818084', '#909090'],
            }),
            opacity: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1],
            })
        };
        return (
            <View style={ styles.containerStyle } >
                    <Animated.Text style={labelStyle}>
                        {i18n.t(label)} 
                    </Animated.Text>
                    <TextInput
                        placeholder={placeHolder}
                        autoCorrect={false}
                        style={styles.inputStyle}
                        value={value ? dontTranslate ? value : i18n.t(value): ''}
                        onChangeText={onSelect}
                        onFocus={() => this.setState({ showModal: true })}
                        onBlur={() => this.animate(value ? 1 : 0)}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/images/down-50.png')} />
                    </TouchableOpacity>
                </View>
        )
    }

    getMode() {
        return !this.state.showModal ? this.showPicker() : this.showModal()
    }
    render() {
        return (
            this.getMode()
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
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

const styles = StyleSheet.create({
    categoryView: {
        
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
        width: '90%',
        backgroundColor: '#99ccff',
        borderWidth: 0,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        elevation: 15, 
        borderRadius: 10
    },
    subCategoryView: {
        flexWrap: 'wrap', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    subCategory: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        height: 100,
        borderWidth: 0, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryText: {
        color: 'white',
        fontSize: 25,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 4 },
        textShadowRadius: 0
    },
    inputStyle: {
        height: 25,
        width: '90%',
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
        borderBottomWidth: 0,
        flexDirection: 'row'
    }
});

export interface IPickerProps {
    label?: string,
    customPickerStyle?: Object,
    customLabelStyle?: Object,
    onSelect?: (selectedData: any) => void,
    ref?: (ref: string) => void,
    data: Array<any>,
    showModal?: boolean,
    placeHolder?: string,
    value?: string,
    dontTranslate?: boolean,
    fieldToShow?: string,
    noHideOnPress?: boolean,
    onclose?: () => void,
    onBack?: () => void,
    showBackButton: boolean

}

