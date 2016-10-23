import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	Dimensions,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './index.ios.js';
registerScreens();

import Icon from 'react-native-vector-icons/FontAwesome'; 

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		// justifyContent: 'center', // vertical
		alignItems: 'center', // horizontal
		// backgroundColor: '#4a8aa2',
		height: deviceHeight,
		width: deviceWidth,
	},
	background: {
		width: deviceWidth,
		height: deviceHeight / 2.4
	},
	headerContainer: {
		marginTop: deviceHeight / 35,
		marginBottom: deviceHeight / 25,
	},
	headerText: {
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0)',
		fontSize: deviceWidth / 16,
	},
	headerTextContainer: {
		marginTop: deviceHeight / 3.3
	},
	textButton: {
		// color: 'white',
		width: deviceWidth,
		paddingTop: deviceHeight / 80,
		paddingBottom: deviceHeight / 80,
		paddingLeft: deviceWidth / 15,
		fontSize: deviceWidth / 20
	},
	buttonContainer: {
		marginTop: deviceHeight / 12,
	},
	button: {
		borderTopColor: 'black',
		borderTopWidth: 0.5,
		width: deviceWidth
	},
	buttonBottom: {
		borderTopColor: 'black',
		borderTopWidth: 0.5,
		borderBottomColor: 'black',
		borderBottomWidth: 0.5,
		width: deviceWidth
	}
})

export default class HomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			explore: null,
			record: null,
			me: null,
			journey: null,
		};
		this._onPressInventory= this._onPressInventory.bind(this);
		this._onPressScan= this._onPressScan.bind(this);
		this._onPressDonate= this._onPressDonate.bind(this);
	}

	componentWillMount() {
		Icon.getImageSource('globe', 25).then((source) => this.setState({ explore: source }));
		Icon.getImageSource('camera', 25).then((source) => this.setState({ camera: source }));
		Icon.getImageSource('user', 25).then((source) => this.setState({ me: source }));
		Icon.getImageSource('qr-code', 25).then((source) => this.setState({ journey: source }));
	}

	_onPressInventory() {
		this.props.navigator.push({
			screen: 'Inventory',
			navigatorStyle: {
				// navBarHidden: true
			}
		});
	}

	_onPressScan() {
		this.props.navigator.push({
			screen: 'Scan',
			navigatorStyle: {
				navBarHidden: true
			}
		});
	}

	_onPressDonate() {
		this.props.navigator.push({
			screen: 'Sell',
			navigatorStyle: {
				// navBarHidden: true
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Image source={require('./img/laptop.jpg')} style={styles.background}>
					<View style={styles.headerTextContainer}>
						<Text style={styles.headerText}>Scan. Sell Online.</Text>
						<Text style={styles.headerText}>Track Thrift Store Inventory</Text>
					</View>
				</Image>
				<View style={styles.buttonContainer}>
					<TouchableHighlight onPress={this._onPressInventory} style={styles.button} underlayColor="transparent">
						<Text style={styles.textButton}>Inventory</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={this._onPressScan} style={styles.button} underlayColor="transparent">
						<Text style={styles.textButton}>Scan a product</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={this._onPressDonate} style={styles.buttonBottom} underlayColor="transparent">
						<Text style={styles.textButton}>Sell</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}