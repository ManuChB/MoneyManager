import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Splash from './splash.component';
import splashAction from './splash.action';
import { ISplashProp } from './splash.model';
import NavigationService from '../shared/service/navigation/navigation.service';

export class SplashScreenComponent extends Component<ISplashProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        NavigationService.setNavigator(this.props.navigation);
        this.props.actions.initializeStart();
    }
    
    render() {
        return (
            <Splash {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.splash };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators<any>(splashAction, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreenComponent);
