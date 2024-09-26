import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { styles } from './PunchStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import DeviceInfo from 'react-native-device-info'; // Import DeviceInfo

const Punch = ({ navigation }) => {
  const camera = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [EmployeeId, setEmployeeId] = useState('');
  const [punchloading, setPuchLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const mapViewRef = React.useRef(null);
  const { hasPermission } = useCameraPermission();

  useEffect(() => {
    // Check if developer mode is enabled
    DeviceInfo.isDevelopmentMode().then(isDevMode => {
      if (isDevMode) {
        Alert.alert('Developer Mode Enabled', 'You cannot punch while developer mode is enabled. Please turn it off.');
      }
    });

    const getEmployeeId = async () => {
      try {
        const id = await AsyncStorage.getItem("EmployeeId");
        if (id !== null) {
          setEmployeeId(id);
        }
      } catch (error) {
        console.error('Error retrieving EmployeeId:', error);
      }
    };

    getEmployeeId();
    getLocation();
  }, []);

  const getLocation = async () => {
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
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    };

    const result = await requestLocationPermission();
    if (result) {
      setLoadingLocation(true);
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoadingLocation(false);
        },
        error => {
          Alert.alert('Geolocation Error', error.message);
          console.error('Geolocation error:', error);
          setLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Alert.alert('Geolocation Permission', 'Please allow access to location for Punch.', [{ text: 'OK' }]);
      navigation.goBack();
    }
  };

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
    }
  };

  const postPunchData = async () => {
    const currentDateTime = new Date().toLocaleString();
    const punchData = {
      Latitude: latitude.toString(),
      Longitude: longitude.toString(),
      EmployeeId: EmployeeId,
      CurrentDate: currentDateTime,
    };
    setPuchLoading(true);

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
        Alert.alert('Punch Success', 'Your punch was successful.');
      } else {
        Alert.alert('Punch Failed', 'Failed to post punch data.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while posting punch data.');
    } finally {
      setPuchLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapcontainer}>
        <MapView
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
        <View>
          <View style={[styles.ImgContainer, { backgroundColor: '#f4d9ff' }]}>
            {imageSource !== '' ? (
              <Image
                style={styles.Image}
                source={{ uri: `file://${imageSource}` }}
              />
            ) : (
              <Image source={require('../../src/assets/selfie(1).png')} style={{ width: 150, height: 150, marginRight: 50, marginTop: 30 }} />
            )}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.text}>
          Longitude: {loadingLocation ? <ActivityIndicator size="small" color="#0000ff" /> : longitude}
        </Text>
        <Text style={styles.text}>
          Latitude: {loadingLocation ? <ActivityIndicator size="small" color="#0000ff" /> : latitude}
        </Text>
        <Text style={styles.text}>EmployeeId: {EmployeeId}</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={() => setShowCamera(true)}>
          <Text style={styles.txt}>Take Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={postPunchData} disabled={punchloading}>
          {punchloading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.txt}>Punch</Text>
          )}
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
            mirrorImage={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.camButton} onPress={capturePhoto} />
          </View>
        </>
      )}
    </View>
  );

};

export default Punch;
