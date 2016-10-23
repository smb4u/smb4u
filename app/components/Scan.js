import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './index.ios.js';
registerScreens();

import Camera from 'react-native-camera';

export default class Scan extends Component {
	render() {
		return(
			<View>
				<Text> testing</Text>
			</View>
		)
	}
}