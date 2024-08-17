import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(getLoginDetails, 3000);
  }, []);

  const getLoginDetails = async () => {
    let Status = await AsyncStorage.getItem('response');
    console.log(Status);
    if (Status !== null && Status.includes('SUCCESS')) {
      navigation.replace('MainScreen');
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.upper}>
        <View>
          <Text style={styles.company_name}>QR Scan</Text>
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
    backgroundColor: '#276A76',
    paddingTop: StatusBar.currentHeight,
  },

  upper: {
    flex: 25,
    marginTop: '10%',
    marginHorizontal: '5%',
    backgroundColor: '#276A76',
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
