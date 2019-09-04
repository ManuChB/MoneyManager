import React from 'react';
import store from './src/store/configreStore';
import NavigationState from './src/NavigationState';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
require('moment/locale/cs.js');
require('moment/locale/es.js');
require('moment/locale/fr.js');
require('moment/locale/nl.js');


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

/* app.js */
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});

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
