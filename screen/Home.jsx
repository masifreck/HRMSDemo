import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Animated,
  Easing,
  Dimensions,
  PermissionsAndroid,
  Button,
  FlatList,
  Modal,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import RNSimData from 'react-native-sim-data';
import DeviceNumber from 'react-native-device-number';
import GetLocation from 'react-native-get-location';
import SimCardsManager from 'react-native-sim-cards-manager';

import DeviceInfo from 'react-native-device-info';

const wW = Dimensions.get('screen').width;
const wH = Dimensions.get('screen').height;
let isFine;
wW < 400 ? (isFine = true) : (isFine = false);

const Home = () => {
  const navigation = useNavigation();

  const handleScanTPPress = () => {
    navigation.navigate('ScannerTP');
  };

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 95, // Adjust this value based on your screen height
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [translateY]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [locationlat, setLocationlat] = useState(null);
  const [locationlon, setLocationlon] = useState(null);
  const [locationLoading, setlocationLoading] = useState(false);
  const [Location, setLocation] = useState('Enter Code');
  // const [error, setError] = useState(null);

  const requestPermissions = async () => {
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    };

    const requestPhoneStatePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
          ]);

          return (
            granted['android.permission.READ_PHONE_STATE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.READ_SMS'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.READ_PHONE_NUMBERS'] ===
              PermissionsAndroid.RESULTS.GRANTED
          );
        } catch (err) {
          console.warn(err);
          return false;
        }
      }
      return true;
    };

    const locationPermission = await requestLocationPermission();
    const phoneStatePermission = await requestPhoneStatePermission();

    return locationPermission && phoneStatePermission;
  };

  // useEffect(() => {
  //   const data = requestPermissions();
  //   if (data) {
  //     GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 60000,
  //     })
  //       .then(location => {
  //         console.log(location);
  //       })
  //       .catch(error => {
  //         const {code, message} = error;
  //         console.warn(code, message);
  //       });
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         console.log(position);
  //         // setLocationlat(position.coords.latitude);
  //         // setLocationlon(position.coords.longitude);
  //         const options = {
  //           method: 'GET',
  //           headers: {accept: 'application/json'},
  //         };
  //         // fetch(
  //         //   `https://us1.locationiq.com/v1/reverse?key=pk.fc541a003aba6123ac24773c3a826f7f&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
  //         //   options,
  //         // )
  //         //   .then(response => response.json())
  //         //   .then(response => {
  //         //     console.log(response.address.city);
  //         //     setLocation(response.address.city);
  //         //   })
  //         //   .catch(err => console.error(err));
  //       },
  //       error => {
  //         // See error code charts below.
  //         console.log('error');
  //         // console.log(error.code, error.message);
  //         // setLocationlat(false);
  //         // setLocationlon(false);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );
  //   }
  // }, []);

  // const options = {method: 'GET', headers: {accept: 'application/json'}};
  // useEffect(() => {
  //   if (locationlat && locationlon) {
  //     console.log('entered');
  //     fetch(
  //       `https://us1.locationiq.com/v1/reverse?key=pk.fc541a003aba6123ac24773c3a826f7f&lat=${locationlat}&lon=${locationlon}&format=json`,
  //       options,
  //     )
  //       .then(response => response.json())
  //       .then(response => {
  //         console.log(response.address.city);
  //         setLocation(response.address.city);
  //       })
  //       .catch(err => console.error(err));
  //   }
  // }, [locationlat, locationlon]);

  // useEffect(() => {
  //   const fetchSimData = async () => {
  //     const hasPermissions = await requestPermissions();
  //     if (hasPermissions) {
  //       // const simData = RNSimData.getSimInfo();
  //       // setPhoneNumber(simData.phoneNumber0);
  //       DeviceNumber.get().then(res => {
  //         console.log(res);
  //         setPhoneNumber(res);
  //       });
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log(position);
  //           setLocation(position);
  //         },
  //         error => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //           setLocation(false);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     } else {
  //       console.log('Required permissions not granted');
  //     }
  //   };

  //   fetchSimData();
  // }, []);

  // const getLocation = () => {
  //   const result = requestPermissions();
  //   result.then(res => {
  //     console.log('res is:', res);
  //     if (res) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log(position);
  //           setLocation(position);
  //         },
  //         error => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //           setLocation(false);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   });
  //   console.log(location);
  // };
  const [data2, setdata2] = useState(null);
  const [simdata, setsimdata] = useState('');
  const [simdata1, setsimdata1] = useState('');
  const [s1, sets1] = useState('');
  const [s2, sets2] = useState('');

  _onPhoneNumberPressed = async () => {
    // DeviceNumber.get().then(res => {
    //   console.log(res);

    // });
    DeviceInfo.getAndroidId().then(androidId => {
      // androidId here
      sets1(androidId);
    });
    const deviceId = DeviceInfo.getUniqueId();
    sets2(deviceId);

    console.log(deviceId);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    // Process the input value here (e.g., validate, save, etc.)
    // Alert.alert('Input Value', textInputValue);
    setModalVisible(false);
    // setTextInputValue('');
  };
  useEffect(() => {
    setLocation(textInputValue);
  }, [textInputValue]);

  // useEffect(() => {
  //   // const data1 = RNSimData.getSimInfo().deviceId1;
  //   // For the first SIM
  //   _onPhoneNumberPressed();
  //   // const data2 = RNSimData.getSimInfo();
  //   // setdata2(data2);
  //   // if (data2) {
  //   //   let deviceId0 = RNSimData.getSimInfo().deviceId0;

  //   //   // For the second SIM
  //   //   let deviceId1 = RNSimData.getSimInfo().deviceId1;

  //   //   console.log('Device ID for SIM 1: ', deviceId0);
  //   //   console.log('Device ID for SIM 2: ', deviceId1);
  //   //   // console.log(data1);
  //   //   deviceId0 ? setsimdata(deviceId0) : setsimdata('no sim1');
  //   //   deviceId1 ? setsimdata1(deviceId1) : setsimdata1('no sim2');
  //   // }

  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  //   })
  //     .then(location => {
  //       console.log(location);
  //       const options = {method: 'GET', headers: {accept: 'application/json'}};
  //       const fetchWithTimeout = (url, options, timeout = 10000) => {
  //         return Promise.race([
  //           fetch(url, options),
  //           new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  //         ]);
  //       };
  //       fetch(
  //         `https://us1.locationiq.com/v1/reverse?key=pk.fc541a003aba6123ac24773c3a826f7f&lat=${location.latitude}&lon=${location.longitude}&format=json`,
  //         options
  //       )
  //         .then(response => response.json())
  //         .then(response => {
  //           setlocationLoading(false);
  //           console.log(response);
  //           const data = response.address.city.split(' ')[0];
  //           setLocation(data);
  //         })
  //         .catch(err => {
  //           console.error('Network Error');
  //           setlocationLoading(false);
  //           setLocation('Enter Location Here');
  //           console.log('entered');
  //         });
  //     })
  //     .catch(error => {
  //       setlocationLoading(false);
  //       setLocation('Enter Location Here');
  //       // console.log('entered');
  //       // console.error('Network Error');
  //       const {code, message} = error;
  //       console.log(code, message);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#276A76" />

      {/* Header==================================== */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          flexDirection: 'row',
          // justifyContent: 'center',
          // // alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../screen/assets/tranzolLogo.png')}
          style={{width: 50, height: 50}}
        />
        <Text style={{fontWeight: 900, fontSize: 20, color: '#276A76'}}>
          Tranzol
        </Text>
      </View>
      {/* <View style={styles.logocontainer}>
        <Image
          source={require('../screen/assets/qr.png')}
          style={styles.logo}
        />
        <Animated.View style={[styles.line, {transform: [{translateY}]}]} />
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          // backgroundColor: 'black',
          borderRadius: 5,
          padding: 5,
          height: '10%',
          marginTop: '2%',
          // width: '40%',
          position: 'absolute',

          top: 0,
          right: 0,
        }}>
        {locationLoading ? (
          <ActivityIndicator animating={true} color="#2596be" size="small" />
        ) : (
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              style={{padding: 0, margin: 0}}
              onPress={handleOpenModal}>
              <Text
                style={{
                  color: '#276A76',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '700',
                  marginRight: 5,
                  padding: 0,
                }}>
                <Image
                  source={require('../screen/assets/location.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: '#276A76',
                  }}
                />
                {'  '}
                CODE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* <TouchableOpacity style={styles.button} onPress={handleScanTPPress}>
        <Text style={styles.text}>Scan</Text>
      </TouchableOpacity> */}

      {/* Camera===================================== */}
      <Text
        style={{
          color: '#276A76',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '700',
          marginRight: 5,
          padding: 0,
          marginBottom: 20,
        }}>
        Scanner
      </Text>
      <View
        style={{
          height: '30%',
          width: '60%',
          // backgroundColor: '#276A76',
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* {cameraActive && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
        )} */}
        <TouchableOpacity
          style={{
            backgroundColor: '#276A76',
            borderRadius: 5,
            marginVertical: '5%',
            height: 40,
            width: 130,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.text}>Scan Here</Text>
        </TouchableOpacity>
      </View>

      {/* Text Input================================= */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={'gray'}
          style={{
            // paddingLeft: 30,
            color: 'black',
            fontSize: isFine ? 10 : 13,
            width: '90%',
            fontFamily: 'PoppinsRegular',
          }}
          placeholder={'Enter PassNo'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={'gray'}
          style={{
            // paddingLeft: 30,
            color: 'black',
            fontSize: isFine ? 10 : 13,
            width: '90%',
            fontFamily: 'PoppinsRegular',
          }}
          placeholder={'Enter TruckNo'}
        />
      </View>
      {/* Last Buttons=============================== */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',

          justifyContent: 'space-evenly',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text}>In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text}>Out</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              onChangeText={setTextInputValue}
              value={textInputValue}
              placeholder="Enter text"
              autoFocus={true}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button1}>
                <Button title="Cancel" onPress={handleCloseModal} />
              </View>
              <View style={styles.button1}>
                <Button title="OK" onPress={handleConfirm} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  logocontainer: {
    width: 100,
    height: 100,
    position: 'relative', // Ensures absolute positioning works

    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: '#276A76',
    // backgroundColor:"red"
  },
  button: {
    backgroundColor: '#276A76',
    borderRadius: 5,
    marginVertical: '5%',
    height: '6%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#276A76',
    borderRadius: 5,
    marginVertical: '5%',
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',

    fontWeight: '900',
  },
  line: {
    width: 80,
    height: 4,
    backgroundColor: 'red',
    position: 'absolute',
    shadowColor: 'red',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 100,
    shadowRadius: 100,
    elevation: 50, // Adjust elevation as needed
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  phoneNumber: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    color: 'black',
  },
  leftRightContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1,0%',
    flexDirection: 'row',
  },
  leftView: {
    flex: 1,
    backgroundColor: 'blue', // Example color
  },
  rightView: {
    flex: 1,
    backgroundColor: 'green', // Example color
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button1: {
    width: '40%', // Adjust width as needed
  },
  inputContainer: {
    height: isFine ? wH * 0.06 : wH * 0.06,
    width: isFine ? wW * 0.8 : wW * 0.8,
    // backgroundColor: 'red',

    // paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: '3%',
    marginBottom: '5%',
    borderBlockColor: '#276A76',
    borderWidth: 1,
    flexDirection: 'row',
  },
});

export default Home;
