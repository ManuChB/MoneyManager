import React, { Component } from 'react';
import { NetInfo } from 'react-native';;
import { ISplashProp } from './splash.model';
import { Spinner } from '../shared/components/common/Spinner';
import { LinearGradient } from 'expo-linear-gradient';
import i18n  from '../shared/service/i18n';

export default class Splash extends Component<ISplashProp> {

    constructor(props) {
        super(props);
        this.state = { isConnected: true };
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener("connectionChange", this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectivityChange);
    }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            alert(i18n.t('general.noWifi'));
            this.setState({ isConnected });
        }
    };
    componentWillMount() {
        this.props.actions.initializeStart();
    }
    render() {
        return(
            <LinearGradient
                start={{ x: 0.0, y: 0.2 }}
                end={{ x: 0.75, y: 1.0 }}
                locations={[0, 0.3, 0.7]}
                colors={['#58e8da', '#97A2C4', '#8362d1']} //['#97A2C4', '#CFCD5B', '#350F90']
                style={{ flex: 1}}>
                {(this.props.state.isInitialized || !this.state.isConnected) && <Spinner conectionError={!this.state.isConnected}></Spinner>}

            </LinearGradient>
            
        )  
    }
}
