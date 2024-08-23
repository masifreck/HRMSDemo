
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
  Alert
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Loading from '../component/Loading';
import { styles } from './PunchStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Punch = ({ navigation }) => {
  const camera = useRef(null);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  // state to hold location
  const [location, setLocation] = useState(false);
  const [latitude, setLatitude] = useState(20.2376);
  const [longitude, setLongitude] = useState(84.2700);
  const [EmployeeId,setEmployeeId]=useState('')

  useEffect(() => {
    const getEmployeeId = async () => {
        try {
            const id = await AsyncStorage.getItem("EmployeeId");
            if (id !== null) {
                setEmployeeId(id); // Set the state with the retrieved EmployeeId
                console.log('EmployeeId puch page:', EmployeeId); // Optional: Log the retrieved EmployeeId
            } else {
                console.log('No EmployeeId found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving EmployeeId:', error);
        }
    };

    getEmployeeId();
}, []); 


  // function to check permissions and get Location
  const getLocation = async () => {
    // Function to get permission for location
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        return false;
      }
    };
    //function for camera permission
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    // calling of location permission function
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
        //calling of camera permission function
        getPermission();
      }
      else {
        Alert.alert('Geolocation Permission', 'Please allow to access location for Punch , Otherwise you can not Punch.', [
          { text: 'OK', onPress: async () => console.log("ok") },
        ]);
        navigation.goBack();
      }
    });
    console.log(location)
  };

  /*useEffect(() => {
    getLocation();
  }, []);*/

  useEffect(() => {
    // Move the map region to the user's current location when coordinates are available
    if (mapViewRef.current && latitude && longitude) {
      mapViewRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [latitude, longitude]);

  const mapViewRef = React.useRef(null);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  if (device == null) {
    return <Loading />;
  }
  const getCurrentDateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };
  
  const postPunchData = async () => {
    // Get the current date and time when the user clicks the punch button
    const currentDateTime = getCurrentDateTime();
    
    const punchData = {
      Latitude: latitude.toString(), // Use the state for latitude
      Longitude: longitude.toString(), // Use the state for longitude
      EmployeeId: EmployeeId, // Employee ID from AsyncStorage
      CurrentDate: currentDateTime, // Get date and time dynamically
    };
  
    try {
      const response = await fetch('https://hrexim.tranzol.com/api/Attendance/Punch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(punchData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Punch data posted successfully', result);
        Alert.alert('Punch Success', 'Your punch was successful.');
      } else {
        console.error('Error posting punch data', result);
        Alert.alert('Punch Failed', 'Failed to post punch data.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while posting punch data.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.mapcontainer}>
        <MapView
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 20.2376,
            longitude: 84.2700,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showUserLocation={true}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
        <View>
          <View style={styles.ImgContainer}>
            {imageSource !== '' ? (
              <Image
                style={styles.Image}
                source={{
                  uri: `file://'${imageSource}`,
                }}
              />
            ) : (
              <Image source={require('../assets/mypic.jpeg')} style={styles.Image} />
            )}
          </View>
        </View>

      </View>
      <View style={{ marginTop: 50 }}>
        {/* <Text style={{color:'black'}}>Time</Text> */}
        <Text style={styles.text}>Longitude : {longitude}</Text>
        <Text style={styles.text}>Latitude: {latitude}</Text>
        <Text style={styles.text}>EmployeId: {EmployeeId}</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={() => setShowCamera(true)}>
          <Text style={styles.txt}>Take Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={postPunchData}>

          <Text style={styles.txt}>Punch</Text>
        </TouchableOpacity>
      </View>
      {showCamera && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.camButton} onPress={() => capturePhoto()} />
          </View>
        </>
      )}
    </View>
  );
};



export default Punch;
