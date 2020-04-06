import * as React from '../../node_modules/react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '../../node_modules/@react-navigation/bottom-tabs';
import Diseases from '../components/Diseases';
import PestScreen from '../components/PestScreen';

const Tab = createBottomTabNavigator();

function moreDetailsScreen({route, navigation}) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
        labelStyle: {
          fontSize: 14,
        },
      }}>
      <Tab.Screen
        name="Diseases"
        component={Diseases}
        options={{
          tabBarLabel: 'Diseases',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/img/diseas.png')}
            />
          ),
        }}
        initialParams={{id: route.params.data.id}}
      />
      <Tab.Screen
        name="PestScreen"
        component={PestScreen}
        options={{
          tabBarLabel: 'Pests',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{width: 25, height: 20}}
              source={require('../assets/img/pests.png')}
            />
          ),
        }}
        initialParams={{id: route.params.data.id}}
      />
    </Tab.Navigator>
  );
}

export default moreDetailsScreen;
