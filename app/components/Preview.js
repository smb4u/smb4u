import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  AlertIOS
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './index.ios.js';
registerScreens();

import Icon from 'react-native-vector-icons/FontAwesome';

import QRCode from 'react-native-qrcode';
import { RNS3 } from 'react-native-aws3';

var key_file = require('../../config.js');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      description: '',
      category: '',
      price: 0,
      text: 'http://facebook.github.io/react-native/'
    }
    this.descriptionBox = this.descriptionBox.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);
    this.goBackToCamera = this.goBackToCamera.bind(this);
  }
 
  componentDidMount() {

  }

  descriptionBox() {
    AlertIOS.prompt(
      'Description', null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: description => {
          this.setState({description: description});
        }},
      ], 
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
      const code = this.getCode();
      const photo = {
        image: this.state.image.path,
        filename: code + '.png'
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
        description: this.state.description,
        category: this.state.category,
        price: this.state.price,
        QRcode: code,
        url: 'https://franticrust.s3-us-west-1.amazonaws.com/uploads%2F' + photo.filename,
      };
      
      fetch('http://ec2-35-161-63-144.us-west-2.compute.amazonaws.com:8000/saveItem', 
        {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(photoObj)
        })
        .then(res => res.json())
        .then(res => {
          console.warn('res', res);
        })
        .catch((error) => console.warn("fetch error:", error))

      AlertIOS.alert('Photo is now Live');
      this.props.navigator.popToRoot();
  }

  goBackToCamera() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: this.state.image.path}} />
        <TouchableHighlight onPress={this.descriptionBox}>
          <Text style={styles.text}>Enter Description</Text>
        </TouchableHighlight>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <TouchableHighlight onPress={this.goBackToCamera} underlayColor='transparent'>
            <Text>Reject</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.button}>
            <TouchableHighlight onPress={this.submitPhoto} underlayColor='transparent'>
            <Text>Accept</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
      /*
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({text: text})}
                value={this.state.text}
            />
            <QRCode
                value={this.state.text}
                size={200}
                bgColor='purple'
                fgColor='white'/>
        </View>*/
              // <Image source={require('./images/reject.png')} style={styles.accept} />
              // <Image source={require('./images/accept.png')} style={styles.accept} />
        // <Cards image={{imageLink: this.state.image.path, comment: '• How does it look? •'}} commentBox={this.commentBox.bind(this)} submitPhoto={this.submitPhoto.bind(this)} />

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
  },
  thumbnail: {
    width: deviceWidth / 2,
    height: deviceHeight / 2,
    borderRadius: 5,
    // overflow: 'hidden',
    borderColor: 'grey',
    // backgroundColor: 'white',
    borderWidth: 1,
  },
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      borderRadius: 5,
      padding: 5,
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
