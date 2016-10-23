import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './index.ios.js';
registerScreens();

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import QRCode from 'react-native-qrcode';

const INVENTORY = {
  inventory: [
    {
      url: 'http://esq.h-cdn.co/assets/cm/15/06/54d430ff518b7_-_esq-jcrew-gingham-shirt-instagram-082114-l33u8h-xl.jpg',
      category: 'Shirt',
      QRCode: 43625789213,
      description: 'Dress shirt',
      price: '$10',
      id: 1
    },
    {
      url: 'http://bananarepublic.gap.com/webcontent/0011/840/678/cn11840678.jpg',
      category: 'Shirt',
      QRCode: 43626459213,
      description: 'Red Chinos',
      price: '$14',
      id: 2
    },
    {
      url: 'http://bananarepublic.gap.com/webcontent/0011/976/860/cn11976860.jpg',
      category: 'Pants',
      QRCode: 48725789213,
      description: 'Blue Jeans',
      price: '$8',
      id: 3
    },
    {
      url: 'http://bananarepublic.gap.com/webcontent/0012/351/892/cn12351892.jpg',
      category: 'Shirt',
      QRCode: 436123789213,
      description: 'Black cotton shirt',
      price: '$6',
      id: 4
    },
    {
      url: 'http://bananarepublic.gap.com/webcontent/0011/880/833/cn11880833.jpg',
      category: 'Shoes',
      QRCode: 43625778913,
      description: 'Brown shoes',
      price: '$29',
      id: 5
    },
    {
      url: 'http://img.shein.com/images/sheinside.com/201503/1426063091502309137.jpg',
      category: 'Jacket',
      QRCode: 43625789213,
      description: 'Black jacket',
      price: '$13',
      id: 5
    },
    {
      url: 'https://www.thokkthokkmarket.com/documents/image/12/1275/TT02--T-Shirt--Red-1275.jpg',
      category: 'Shirt',
      QRCode: 43625789213,
      description: 'Red cotton shirt',
      price: '$11',
      id: 7
    },
    {
      url: 'http://cdn.shopify.com/s/files/1/0851/8326/products/AN1_front_large.png?v=1430945745',
      category: 'Shirt',
      QRCode: 43625789213,
      description: 'White shirt',
      price: '$16',
      id: 8
    },
  ],
};

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumbnail: {
    width: deviceWidth / 8,
    height: deviceWidth / 8,
  },
  text: {
    flex: 1,
  },
});

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Inventory extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	    dataSource: ds.cloneWithRows(INVENTORY.inventory),
	  }
	}

	componentDidMount() {
		// this.getInventory();
	}

	getInventory() {
	  fetch('http://104.236.188.210:8000/getPhotos',
	  {
	      method: 'POST',
	      headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json',
	      },
	      body: JSON.stringify(sendInfo)
	  })
	  .then((err) => {
	    var context = this;
	    if(err.status === 201) {
	      this.setState({
	        dataSource: ds.cloneWithRows(JSON.parse(err._bodyInit)),
	        pictures: JSON.parse(err._bodyInit),
	        loaded: true
	      });
	    }
	  })
	}

	render() {
		return(
			<View>
				<ListView
				  contentContainerStyle={styles.gridList}
				  dataSource={this.state.dataSource}
				  enableEmptySections={true}
				  automaticallyAdjustContentInsets={false}
				  // renderRow={(rowData) => this.typeOfList.bind(this, rowData)}
				  renderRow={(rowData) => <ListItem inventory={rowData} />}
				/>
			</View>
		)
	}
}

const ListItem = (props) => (
	<View style={styles.row}>
	    <Image style={styles.thumbnail} source={{uri: props.inventory.url}} />
		<Text>{props.inventory.description}</Text>
	</View>
)
			
				
