import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import Settings from './settings.component';
import settingsAction from './settings.action';
import { ISettingsProp } from './settings.model';

export class SettingsScreenComponent extends Component<ISettingsProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.settingsInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <Settings {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.settings };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(settingsAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreenComponent);
