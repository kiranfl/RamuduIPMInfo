import * as React from '../../node_modules/react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '../../node_modules/@react-navigation/drawer';

import HomePage from './HomePage';
import PestNews from '../components/PestNews';
import Videos from '../components/Videos';
import StrawberriesVegetables from '../components/StrawberriesVegetables';
import Feedback from '../components/Feedback';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="IPMInfo"
        style={{
          backgroundColor: '#997615',
          width: wp('100%'),
          marginLeft: 0,
          marginTop: -5,
        }}
        labelStyle={{
          textAlignVertical: 'center',
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold',
          marginLeft: 70,
        }}
      />
      <DrawerItemList
        activeBackgroundColor={'lightgray'}
        activeTintColor={'black'}
        labelStyle={{fontSize: 16}}
        {...props}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function Main() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Farm Crops" component={HomePage} />
      <Drawer.Screen name="Pest News" component={PestNews} />
      <Drawer.Screen
        name="Strawberries-Vegetables"
        component={StrawberriesVegetables}
      />
      <Drawer.Screen name="Videos" component={Videos} />
      <Drawer.Screen name="Feedback" component={Feedback} />
    </Drawer.Navigator>
  );
}

export default Main;
