import { Navigation } from 'react-native-navigation';
import { registerScreens } from './components';
registerScreens(); 

Navigation.startSingleScreenApp({
  screen: {
    screen: 'HomeView',
    title: 'Itemwise',
    navigatorStyle: {
        // drawUnderNavBar: true,
        // navBarTranslucent: true
    	// navBarHidden: true
        navBarTextColor: 'white',
        navBarBackgroundColor: '#4a8aa2',
    }
  },
  drawer: {
  	left: { 
  	  screen: 'SideNav' 
  	}
  },
  portraitOnlyMode: true
});