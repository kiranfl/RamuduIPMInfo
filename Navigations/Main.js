import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import HomePage from './HomePage'
import CropList from '../components/CropList'
import PestNews from '../components/PestNews'
import StrawberriesVegetables from '../components/StrawberriesVegetables'

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function Main() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Farm Crops" component={HomePage} />
      <Drawer.Screen options={{ headerShown: true }} name="Pest News" component={PestNews} />
      <Drawer.Screen options={{ headerShown: true }} name="Strawberries-Vegetables" component={StrawberriesVegetables} />
      <Drawer.Screen name="Discover" component={HomePage} />
      <Drawer.Screen name="Meeting Handouts" component={HomePage} />
      <Drawer.Screen name="Meeting Presentations" component={HomePage} />
      <Drawer.Screen name="Videos" component={HomePage} />
      <Drawer.Screen name="About Us" component={HomePage} />
      <Drawer.Screen name="Notifications" component={HomePage} />
      <Drawer.Screen name="Preferences" component={HomePage} />
      <Drawer.Screen name="Feedback" component={HomePage} />
      <Drawer.Screen name="CropList" component={CropList} />
    </Drawer.Navigator>
  );
}

export default Main;