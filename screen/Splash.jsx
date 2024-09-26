import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const employeeId = await AsyncStorage.getItem('EmployeeId');
        console.log('Employee ID found in splash:', employeeId);
        
        // Navigate based on EmployeeId presence
        if (employeeId !== null) {
          navigation.replace('DrawerNavigation');
        } else {
          navigation.replace('newlogin');
        }
      } catch (error) {
        console.error('Error reading EmployeeId from AsyncStorage:', error);
      }
    };

    // Add a delay to simulate a splash screen
    setTimeout(checkLoginStatus, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.upper}>
        <Image style={{ width: 100, height: 100 }} source={require('../src/assets/mypic.jpeg')} />
        <View>
          <Text style={styles.company_name}>HR MS</Text>
        </View>
      </View>
      <View style={styles.lower}>
        <Text style={styles.tranzol}>Powered By Tranzol</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa18ea',
    paddingTop: StatusBar.currentHeight || 0,
  },
  upper: {
    flex: 25,
    marginTop: '10%',
    marginHorizontal: '5%',
    backgroundColor: '#aa18ea',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  lower: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  company_name: {
    fontFamily: 'PoppinsExtraBold',
    color: '#eeeeee',
    fontSize: 30,
    textAlign: 'center',
    letterSpacing: 5,
  },
  tranzol: {
    fontSize: 10,
    position: 'absolute',
    bottom: 30,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    color: '#eeeeee',
  },
});

export default Splash;
