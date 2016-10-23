import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './index.ios.js';
registerScreens();

import { RNS3 } from 'react-native-aws3';
// import CameraView from './CameraView.ios.js';
import Icon from 'react-native-vector-icons/FontAwesome';

var key_file = require('../../config.js');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      comment: 'Enter a title',
      navigator: props.navigator
    }
  }
 
  componentDidMount() {

  }

  commentBox() {
    AlertIOS.prompt(
      'Photo Comment',
      'Link a comment to this photo',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: comment => {
          this.setState({comment: comment});
        }},
      ]
    );
  }

  getCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  submitPhoto() {
      const photo = {
        image: this.state.image.path,
        filename: this.getCode() + '.png'
      };
      const file = {
        uri: photo.image,
        name: photo.filename,
        type: "image/png"
      };
      const options = {
        keyPrefix: "uploads/",
        bucket: "franticrust",
        region: "us-west-1",
        accessKey: key_file.S3_ACCESS_KEY, 
        secretKey: key_file.S3_SECRET_KEY,
        successActionStatus: 201
      };

      RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      });

      const photoObj = {
        comment: this.state.comment,
        imageLink: 'https://franticrust.s3-us-west-1.amazonaws.com/uploads%2F' + photo.filename,
      };
      
      fetch('http://ec2-35-160-178-236.us-west-2.compute.amazonaws.com:8000/upload', 
        {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(photoObj)
        });
      AlertIOS.alert('Photo is now Live');
      this.goBackToCamera();
  }

  goBackToCamera() {
    this.state.navigator.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <TouchableHighlight onPress={this.goBackToCamera.bind(this)} underlayColor='transparent'>
            <Text> testing</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.button}>
            <TouchableHighlight onPress={this.submitPhoto.bind(this)} underlayColor='transparent'>
            <Text> testing</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
              // <Image source={require('./images/reject.png')} style={styles.accept} />
              // <Image source={require('./images/accept.png')} style={styles.accept} />
        // <Cards image={{imageLink: this.state.image.path, comment: '• How does it look? •'}} commentBox={this.commentBox.bind(this)} submitPhoto={this.submitPhoto.bind(this)} />

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: deviceHeight/10
  },
  navbarContainer: {
    // borderWidth: 0.5,
    // borderColor: '#555555',
    backgroundColor:'#FF562E',
    paddingTop: deviceHeight/25,
    height: deviceHeight/12,
    flexDirection: 'row',
    paddingBottom: deviceHeight/80
  },
  navLeft: {
    width: deviceWidth/3,
    // borderWidth: 0.5,
    // borderColor: '#555555',
    justifyContent: 'center',
    paddingLeft: deviceWidth/20
  },
  navMiddle: {
    width: deviceWidth/3,
    // borderWidth: 0.5,
    // borderColor: '#555555',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navRight: {
    width: deviceWidth/3,
    // borderWidth: 0.5,
    // borderColor: '#555555',
    // alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: deviceWidth/20,
    flexDirection: 'row',
  },
  navTitle: {
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    fontFamily: 'Avenir'
  },
  refresh: {
    width: deviceWidth/4,
    // borderWidth: 0.5,
    // borderColor: '#555555',
    alignItems: 'flex-end',
    paddingRight: deviceWidth/20,
  },
  accept: {
    width: deviceWidth /6,
    height: deviceWidth/6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: deviceWidth,
    height: deviceHeight/6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: deviceWidth/2.2,
    height: deviceHeight/6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    // marginTop: 50,
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    // elevation: 1,
  },
  thumbnail: {
    flex: 1,
    width: deviceWidth / 1.1,
    height: deviceHeight / 1.5,
  },
  text: {
    fontSize: 20,
    paddingTop: deviceWidth/80,
    paddingBottom: deviceWidth/80,
    fontFamily: 'Baskerville'
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
    info: {
    right: deviceWidth/2.2, 
    top: -deviceHeight/1.48,
  }
});
