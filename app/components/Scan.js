import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './index.ios.js';
registerScreens();

import Camera from 'react-native-camera';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: deviceHeight,
    width: deviceWidth,
  },
  cameraIcon: {
  	height: deviceHeight / 9,
  	width: deviceHeight / 8.6
  },
  iconContainer: {

  },
  iconButton: {

  }
});

export default class Scan extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      type: Camera.constants.Type.back,
	    }
	    this._takePicture = this._takePicture.bind(this);
	}
	_goToPreview() {
		this.props.navigator.push({
			screen: 'Preview',
			navigatorStyle: {
				// navBarHidden: true
			},
			passProps: {}
		});
	}

	_takePicture() {
	  this.camera.capture()
	    .then((data) => this.setState({image: data}))
	    .catch(err => console.error(err))
	    .then(() => this._goToPreview());
	}

	render() {
		return(
			<View>
				<View style={styles.cameraContainer}>
					<Camera
					  ref={(cam) => {
					    this.camera = cam;
					  }}
					  style={styles.preview}
					  captureTarget={Camera.constants.CaptureTarget.disk}
					  aspect={Camera.constants.Aspect.fill}
					  orientation={Camera.constants.Orientation.portrait}
					  type = {this.state.type}
					  >
					  <View style={styles.iconContainer}>
					  	<TouchableHighlight onPress={this._takePicture} style={styles.iconButton} underlayColor='transparent'>
					      <Image style={styles.cameraIcon} source={require('./img/camera_icon.png')}/>
					    </TouchableHighlight>
					  </View>
					</Camera>
				</View>
			</View>
		)
	}
}