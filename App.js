import React from 'react';
import store from './src/store/configreStore';
import NavigationState from './src/NavigationState';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';



export default class App extends React.Component {
  render() {
    return (
		<Provider store={store()}>
			<View style={{ flex: 1 }}>
				<NavigationState />
			</View>
		</Provider>
    );
  }
}

AppRegistry.registerComponent('moneyManager', () => App);
