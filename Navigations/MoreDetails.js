import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CropList from '../components/CropList';
import PestScreen from '../components/PestScreen'

const Tab = createBottomTabNavigator();

function moreDetailsScreen({ route, navigation }) {
  return (
    <Tab.Navigator tabBarOptions={
      {
        activeTintColor: 'red',
        labelStyle: {
          fontSize: 14,
        },
      }}>
      <Tab.Screen
        name="CropList"
        component={CropList}
        options={{
          tabBarLabel: 'Diseases',
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../assets/img/diseas.png')}
            >
            </Image>
          ),
        }}
        initialParams={{ id: route.params.data.id }}
      />
      <Tab.Screen name="PestScreen" component={PestScreen}
        options={{
          tabBarLabel: 'Pests',
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 25, height: 20 }}
              source={require('../assets/img/pests.png')}
            >
            </Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default moreDetailsScreen;