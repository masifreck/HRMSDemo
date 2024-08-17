
import * as React from 'react';
import {View, Image, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import MainScreen from './screen/MainScreen';

import Login from './screen/Login';
import Splash from './screen/Splash';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
       <StatusBar backgroundColor="#276A76" barStyle="light-content" />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
