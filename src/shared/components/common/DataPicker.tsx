import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Animated, TextInput, Image } from 'react-native';
import { Modal } from '.';
import i18n from '../../service/i18n';
import _ from 'lodash';
import appConstants from '../../../appConstants';

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

    normalMode() {
        const { data, onSelect, dontTranslate, fieldToShow, noHideOnPress } = this.props;
        const field = fieldToShow || 'name';
        return (
            <View style={{ marginBottom: 50 }}>
                {data && data.map((element, key) => {
                    if(!_.isNil(element)){
                        return (
                            <TouchableOpacity
                                style={styles.subCategory}
                                key={key}
                                onPress={() => {
                                    if (!noHideOnPress) { this.setState({ showModal: false }) };
                                    onSelect(element)
                                }}>
                                <View style={[styles.categoryView, element.icon ? { justifyContent: 'space-between' } : null]} key={key} >
                                    {element.icon && <Image style={styles.imageStyle} source={appConstants.transactionIcons[element.icon.name]} />}
                                    <Text style={styles.categoryText} key={key}>
                                        {dontTranslate ? element[field] : i18n.t(element[field])}
                                    </Text>
                                    {element.icon && <Image style={styles.imageStyle} source={appConstants.transactionIcons[element.icon.name]} />}
                                </View>
                            </TouchableOpacity>)
                    }
                })}
                {this.props.children}
            </View>
        )
    }

    iconMode() {
        const { data, onSelect, fieldToShow, noHideOnPress } = this.props;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 50, alignItems: 'center',flexWrap: 'wrap'}}>
                {data && data.map((element, key) => {
                    return (
                        <TouchableOpacity
                            style={styles.iconModeTouch}
                            key={key}
                            onPress={() => {
                                if (!noHideOnPress) { this.setState({ showModal: false }) };
                                onSelect(element)
                            }}>
                            <View style={[styles.iconModeView]} key={key} >
                                <Image style={styles.imageStyle} source={appConstants.transactionIcons[element.name]} />
                            </View>
                        </TouchableOpacity>
                    )
                })}
                { this.props.children }
            </View >
        )
    }

    showModal() {
        const { showBackButton, onBack, iconMode } = this.props;
        return (
            <Modal closeModal={this.closeModal.bind(this)} showBack={showBackButton} onBack={onBack} >
                {iconMode && this.iconMode()}
                {!iconMode && this.normalMode()}
            </Modal>
        )
    }

    showPicker() {
        const { dontTranslate, onSelect, placeHolder, value, label, icon, customContainerStyle } = this.props;
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
            <TouchableOpacity 
                style={[styles.containerStyle, customContainerStyle]} 
                onPress={() => this.setState({ showModal: true })} >
                {_.isNil(icon) && <Animated.Text style={labelStyle}>
                    {i18n.t(label)} 
                </Animated.Text>}
                {_.isNil(icon) && <Text
                    placeholder={placeHolder}
                    autoCorrect={false}
                    style={styles.inputStyle}
                    value={value ? dontTranslate ? value : i18n.t(value): ''}
                    onChangeText={onSelect}
                    onFocus={() => this.setState({ showModal: true })}
                    onBlur={() => this.animate(value ? 1 : 0)}
                    underlineColorAndroid="transparent"
                >{value ? dontTranslate ? value : i18n.t(value) : ''}</Text>}
                {_.isNil(icon) && <TouchableOpacity onPress={() => this.setState({ showModal: true })} >
                    <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/images/down-50.png')} />
                </TouchableOpacity>}
                {icon && 
                <TouchableOpacity onPress={() => this.setState({ showModal: true })} style={{ height:40 }}>
                    <Image style={styles.imageStyle} source={icon} />
                </TouchableOpacity>}
            </TouchableOpacity>
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
    iconModeView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        backgroundColor: '#d5e1f0',
        borderWidth: 0,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        elevation: 15,
        borderRadius: 10
    },
    iconModeTouch: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        width: 50,
        height: 50,
        borderWidth: 0,
        margin: 15

    },
    categoryView: {
        flexDirection: 'row',
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
    },
    imageStyle: {
        width: 35,
        height: 35,
        marginLeft: 20,
        marginRight: 20
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
    showBackButton?: boolean,
    icon?: any,
    customContainerStyle?: any,
    iconMode?: boolean
}

