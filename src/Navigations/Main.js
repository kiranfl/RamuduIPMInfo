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
import Icon from 'react-native-vector-icons/FontAwesome';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="IPMInfo"
        style={{
          backgroundColor: '#997615',
          marginLeft: 0,
          marginTop: -4,
          paddingLeft: 0,
          paddingRight: 0,
          marginRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
          borderRadius: 0,
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
        activeBackgroundColor={'#ededed'}
        activeTintColor={'#181933'}
        labelStyle={{fontSize: 16}}
        itemStyle={{
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0,
          paddingTop: 0,
          marginTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        }}
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
      <Drawer.Screen
        options={{
          drawerIcon: config => (
            <Icon style={{color: '#181933'}} size={20} name={'tree'} />
          ),
        }}
        name="Farm Crops"
        component={HomePage}
      />
      <Drawer.Screen
        options={{
          drawerIcon: config => (
            <Icon style={{color: '#181933'}} size={20} name={'video-camera'} />
          ),
        }}
        name="Videos"
        component={Videos}
      />
      <Drawer.Screen
        options={{
          drawerIcon: config => (
            <Icon style={{color: '#181933'}} size={20} name={'comment'} />
          ),
        }}
        name="Feedback"
        component={Feedback}
      />
      <Drawer.Screen
        options={{
          drawerIcon: config => (
            <Icon style={{color: '#181933'}} size={23} name={'newspaper-o'} />
          ),
        }}
        name="Strawberries-Vegetables"
        component={StrawberriesVegetables}
      />
      <Drawer.Screen
        options={{
          drawerIcon: config => (
            <Icon style={{color: '#181933'}} size={23} name={'newspaper-o'} />
          ),
        }}
        name="Pest News"
        component={PestNews}
      />
    </Drawer.Navigator>
  );
}

export default Main;
