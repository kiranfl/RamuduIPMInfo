import * as React from '../../node_modules/react';
import {TouchableOpacity} from 'react-native';
import {DrawerActions} from '../../node_modules/@react-navigation/native';
import {createStackNavigator} from '../../node_modules/@react-navigation/stack';
import MoreDetailsScreen from './MoreDetails';
import Icon from '../../node_modules/react-native-vector-icons/FontAwesome';
import Home from '../components/Home';
import DiseaseDetails from '../components/DiseaseDetails';
import Carousel from '../components/ImagePreview';

const Stack = createStackNavigator();

function HomePage({navigation}, props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
        options={{
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
                style={{marginLeft: 6}}
                size={25}
                name="navicon"
                backgroundColor="#3b5998"
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        options={{
          title: 'IPMInfo',
          headerStyle: {
            backgroundColor: '#997615',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="MoreDetails"
        component={MoreDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="diseaseDetails"
        component={DiseaseDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Carousel"
        component={Carousel}
      />
    </Stack.Navigator>
  );
}

export default HomePage;
