import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import DovizKurlari from '../screen/DovizKurlari';
import DovizKuru from '../screen/DovizKuru';
import SideBar from '../screen/SideBar';
import Kurlar from '../screen/Kurlar';
import Home from '../screen/Home';

export const _DrawerNavigator = DrawerNavigator(
  {
    DovizKurlari: { screen: DovizKurlari },
    DovizKuru: { screen: DovizKuru },
    Kurlar: { screen: Kurlar },
    Home: { screen: Home },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  }
);

export const _StackNavigator = StackNavigator({
  DovizKuru: { screen: DovizKuru },
  DovizKurlari: { screen: DrawerNavigator },
  Kurlar: { screen: DrawerNavigator },
});
