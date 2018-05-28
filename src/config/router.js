import React from 'react';
import {
  DrawerNavigator as BaseDrawerNavigator,
  StackNavigator as BaseStackNavigator,
} from 'react-navigation';
import DovizKurlari from '../screen/DovizKurlari';
import DovizKuru from '../screen/DovizKuru';
import SideBar from '../screen/SideBar';
import Kurlar from '../screen/Kurlar';
import AnaSayfa from '../screen/AnaSayfa';
import Wallet from '../screen/Wallet';
import WalletAdd from '../screen/WalletAdd';

export const DrawerNavigator = BaseDrawerNavigator(
  {
    DovizKurlari: { screen: DovizKurlari },
    DovizKuru: { screen: DovizKuru },
    Kurlar: { screen: Kurlar },
    AnaSayfa: { screen: AnaSayfa },
    Wallet: { screen: Wallet },
    WalletAdd: { screen: WalletAdd },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  }
);

export const StackNavigator = BaseStackNavigator({
  DovizKuru: { screen: DovizKuru },
  DovizKurlari: { screen: DrawerNavigator },
  Kurlar: { screen: DrawerNavigator },
});
