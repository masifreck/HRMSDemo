import * as React from 'react';
import {View, Image, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ScannerScreen from './ScannerScreen';
import HistoryScreen from './HistoryScreen';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

console.log(width);

const tabBarStyle = {
  height: height * 0.07, // 7% of screen height
  paddingVertical: height * 0.01, // 1% of screen height
  paddingHorizontal: width * 0.02, // 2% of screen width
  backgroundColor: '#276A76',
};

const iconSize = width * 0.06; // 5% of screen width

const iconStyle = focused => ({
  padding: width * 0.015, //  1.5%% of screen width
  backgroundColor: focused ? '#ffffff' : '#276A76',
  borderRadius: iconSize / 10,
});

const iconImageStyle = focused => ({
  width: iconSize,
  height: iconSize,
  tintColor: focused ? '#276A76' : '#fff',
});

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#276A76',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: tabBarStyle,
      }}>
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={iconStyle(focused)}>
              <Image
                source={require('./assets/qr.png')}
                style={iconImageStyle(focused)}
              />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={iconStyle(focused)}>
              <Image
                source={require('./assets/history.png')}
                style={iconImageStyle(focused)}
              />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
