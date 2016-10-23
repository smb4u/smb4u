import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './index.ios.js';
registerScreens();

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		// justifyContent: 'center', // vertical
		// alignItems: 'center', // horizontal
		backgroundColor: '#4a8aa2',
		height: deviceHeight,
		width: deviceWidth,
	},
	headerContainer: {
		marginTop: deviceHeight / 35,
		marginBottom: deviceHeight / 25,
		paddingLeft: deviceWidth / 8
	},
	headerText: {
		color: 'white',
		fontSize: deviceWidth / 12
	},
	minorHeaderText: {
		color: 'white',
	},
	button: {
		paddingLeft: deviceWidth / 8,
		// debug
		borderWidth: 0.5,
		borderColor: 'white',
	},
	textButton: {
		color: 'white',
		paddingTop: deviceHeight / 80,
		paddingBottom: deviceHeight / 80,
		fontSize: deviceWidth / 20
	}
});

export default class SideNav extends Component {
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>Itemwise</Text>
					<Text style={styles.minorHeaderText}>seller app</Text>
				</View>
				<TouchableHighlight  style={styles.button} underlayColor="transparent">
					<Text style={styles.textButton}>Dashboard</Text>
				</TouchableHighlight>
				<TouchableHighlight  style={styles.button} underlayColor="transparent">
					<Text style={styles.textButton}>Inventory</Text>
				</TouchableHighlight>
				<TouchableHighlight  style={styles.button} underlayColor="transparent">
					<Text style={styles.textButton}>Donations</Text>
				</TouchableHighlight>
				<TouchableHighlight  style={styles.button} underlayColor="transparent">
					<Text style={styles.textButton}>Profile & Earnings</Text>
				</TouchableHighlight>
			</View>
		)
	}
}