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

export default class Sell extends Component {
	render() {
		return(
			<View>
				<Text> testing</Text>
			</View>
		)
	}
}