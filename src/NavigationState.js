import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import AppNavigator from './AppNavigator';

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    (state) => state.navigation,
);

const addListener = createReduxBoundAddListener('root');

export class NavigationState extends React.Component {
    render() {
        const { dispatch, navigation } = this.props;
        return (
            <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation, addListener })} />
        );
    }
}

export const mapStateToProps = ({ navigation }) => ({ navigation });

export default connect(mapStateToProps)(NavigationState);
