import React from 'react';
import store from './src/store/configreStore';
import NavigationState from './src/NavigationState';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
//import DeviceInfo from 'react-native-device-info';

/********TEMPORARL FIX START*/
// Timer error in JSTimers
// Follow issue https://github.com/firebase/firebase-js-sdk/issues/97
// To "fix" the bug "node_modules\react-native\Libraries\Core\Timers\JSTimers.js" have been modify changing 
// MAX_TIMER_DURATION_MS from 60 * 1000 to 1000 * 1000 
import {
  YellowBox
} from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
console.disableYellowBox = true;

/*const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

****TEMPORARL FIX START END */

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
