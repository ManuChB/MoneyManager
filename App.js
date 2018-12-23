import React from 'react';
import store from './src/store/configreStore';
import NavigationState from './src/NavigationState';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import I18n, { changeLanguage } from './src/i18n';


export default class App extends React.Component {
  render() {
		//	changeLanguage(DeviceInfo.getDeviceLocale());
    return (
		<Provider store={store()}>
				<NavigationState />
		</Provider>
    );
  }
}

AppRegistry.registerComponent('moneyManager', () => App);
