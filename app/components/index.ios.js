import { Navigation } from 'react-native-navigation';

import HomeView from './HomeView';
import SideNav from './SideNav';
import Inventory from './Inventory';
import Scan from './Scan';
import Sell from './Sell';

// register all screens of the app (including internal ones)
export function registerScreens() {
	Navigation.registerComponent('HomeView', () => HomeView);
	Navigation.registerComponent('SideNav', () => SideNav);
  	Navigation.registerComponent('Inventory', () => Inventory);
  	Navigation.registerComponent('Scan', () => Scan);
  	Navigation.registerComponent('Sell', () => Sell);
}