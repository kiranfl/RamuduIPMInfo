import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './src/store/reducers/reducer';

import SplashScreen from './src/components/SplashScreen';
import Main from './src/Navigations/Main';

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

if (__DEV__) {
  import('./ReactronConfig').then(() => console.log('Reactotron Configured'));
}

function Apps() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

class App extends Component {
  render() {
    return <Apps />;
  }
}
const mapStateToProps = state => {
  return {};
};

const AppWithNavigationState = connect(mapStateToProps)(App);
export default function NCAP() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
