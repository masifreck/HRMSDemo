import { View, Text, ScrollView, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Story from '../component/Story'
import CustomSwitch from '../component/CustomSwitch'
import PunchBtn from '../component/PunchBtn'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

  useEffect(() => {
    // Function to get permission for location
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'We need to access your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
        } else {
          console.log('You cannot use Geolocation');
          Alert.alert('Geolocation Permission', 'Please allow to access location for Punch , Otherwise you can not Punch.', [
            { text: 'OK', onPress: async () => console.log("ok") },
          ]);
        }
      } catch (err) {
        console.log('Error :', err);
      }
    };
    requestLocationPermission();
  }, []);

  const navigation = useNavigation()

  const [isScrolling, setIsScrolling] = useState(true);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y !== 0) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <View style={{
        backgroundColor: '#e8d7f5',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: 'black',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Header />
        <Story />
        <View style={{ marginBottom: 30, marginTop: 10 }}>
          <CustomSwitch
            selectionMode={1}
            option1="Employee"
            option2="Manager"
            onSelectSwitch={() => { }}
            width={'90%'}
          />
        </View>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16} >



      </ScrollView>
      <PunchBtn isScrolliing={isScrolling}/>

    </View>
  )
}

export default Home