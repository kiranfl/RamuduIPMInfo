import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoreDetailsScreen from './MoreDetails';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../components/Home';

const Stack = createStackNavigator();

function HomePage({ navigation }, props) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }}
        name="Home"
        component={Home}
        options={
          {
            title: 'IPMInfo',
            headerStyle: {
              backgroundColor: '#997615',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Icon
                  style={{ marginLeft: 6 }}
                  size={25}
                  name="navicon"
                  backgroundColor="#3b5998"
                  color="white">
                </Icon>
              </TouchableOpacity>
            ),
          }}
      />
      <Stack.Screen options={
        {
          title: 'IPMInfo',
          headerStyle: {
            backgroundColor: '#997615',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="MoreDetails" component={MoreDetailsScreen} />
    </Stack.Navigator>
  );
}

export default HomePage;