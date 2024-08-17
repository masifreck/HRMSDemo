import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  Platform,
  Animated,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Touchable,
  Pressable,
  Modal,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Camera,
  useCameraPermission,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';
import RNRestart from 'react-native-restart';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NetworkError from './NetworkError';
import NetworkStatus from './NetworkStatus';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();
// storage.clearStore();
const wW = Dimensions.get('screen').width;
const wH = Dimensions.get('screen').height;
let isFine;
wW < 400 ? (isFine = true) : (isFine = false);

const ScannerScreen = () => {
  const navigation = useNavigation();
  const isConnected = NetworkStatus(); // Use the hook
  // const [isConnected, setIsConnected] = useState(false); // State for network status
  // console.log(isConnected);

  //Keyboard Variables=========================================================================

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const showAlert = () => {
    Alert.alert(
      'Info',
      'Restart App after Permissions',
      [
        {
          text: 'OK',
          onPress: () => checkAndRequestCameraPermission(),
        },
      ],
      {cancelable: false},
    );
  };
  async function checkAndRequestCameraPermission() {
    console.log('restart kindly===========================================');
    console.log(
      PermissionsAndroid.RESULTS.GRANTED,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    try {
      // Check if the permission is already granted
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted) {
        console.log('Camera permission already granted');
        return PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // If permission is not granted, request it
        const requestResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'Note : After Accepting, It restarts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          RNRestart.restart();
          console.log('Camera permission granted');
          console.log(
            'restart kindly===========================================',
          );
          console.log(
            PermissionsAndroid.RESULTS.GRANTED,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
        } else {
          console.log('Camera permission denied');
          // Optionally, you can show an alert to inform the user
          Alert.alert(
            'Permission Denied',
            'You denied camera access. This app requires camera access to function properly.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }

        return requestResult;
      }
    } catch (error) {
      console.error(`Error checking/requesting camera permission: ${error}`);
      return PermissionsAndroid.RESULTS.DENIED;
    }
  }

  // Camera variables==========================================================================

  const [ScannedData, setScannedData] = useState('');
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();

  const [cameraActive, setCameraActive] = useState(false); // State to manage camera activation

  const NoCameraErrorView = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: '#276A76',
          textAlign: 'center',
          fontSize: isFine ? 13 : 15,

          textTransform: 'uppercase',
          fontFamily: 'PoppinsBold',
          marginTop: 5,
          letterSpacing: 1,
        }}>
        Allow Camera Permission
      </Text>
      <TouchableOpacity style={styles.button2} onPress={showAlert}>
        <Text style={styles.text}>Allow</Text>
      </TouchableOpacity>
    </View>
  );

  // console.log('Device:', device);

  // useEffect(() => {
  //   if (!hasPermission) {
  //     setCameraActive(false); // Disable camera if permission denied
  //   }
  // }, [hasPermission]);

  if (!hasPermission) {
    // Handle permission denied case
    console.log('Permission denied');
    return <NoCameraErrorView />;
  }

  if (device === null) {
    // Handle no camera device found case
    console.log('No camera device found');
    return <NoCameraErrorView />;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const scannedValue = codes[0].value;
      console.log(scannedValue);
      setCameraActive(false);
      setScannedData(scannedValue);
    },
  });

  // modal data===========================================================================
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [LocationCode, setLocationCode] = useState('');
  useEffect(() => {
    // Retrieve the stored location code when the component mounts
    const getLocationCode = async () => {
      try {
        const value = await AsyncStorage.getItem('LocationCode');
        if (value !== null) {
          setLocationCode(value);
        } else {
          setLocationCode('Enter Code');
        }
      } catch (error) {
        console.error('Error retrieving location code', error);
      }
    };

    getLocationCode();
  }, []);

  const [UserName, setUserName] = useState('');
  useEffect(() => {
    const getLoginDetails = async () => {
      let Status = await AsyncStorage.getItem('UserName');
      if (Status !== null && Status) {
        setUserName(Status);
      } else {
        console.log('issue with the login page');
      }
    };
    getLoginDetails();
  }, []);

  // Submit Data==================================================================
  //Storage data====================================
  const storeFetchEntry = async (a, b, c, d, e, f) => {
    try {
      const existingEntries = await storage.getString('FetchEntries');
      const entries = existingEntries ? JSON.parse(existingEntries) : [];
      entries.push({a, b, c, d, e, f});
      await storage.setString('FetchEntries', JSON.stringify(entries)); // Correct method for setting data
      console.log('Data inserted successfully');
    } catch (error) {
      console.log('Error storing data:', error.message);
    }
  };
  // =====================
  const [PassNo, setPassNo] = useState('');
  const [TruckNo, setTruckNo] = useState('');
  const handleConfirm = () => {
    setLocationCode(textInputValue);
    setModalVisible(false);
    AsyncStorage.setItem('LocationCode', textInputValue);
    setIsLocationCodeAvailable(true)
  };

  useEffect(() => {
    const dataArray = ScannedData.split('|');
    setPassNo(dataArray[0]);
    setTruckNo(dataArray[dataArray.length - 1]);
  }, [ScannedData]);

  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (LocationCode.length === 0 && UserName.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [LocationCode, UserName]);
  const newdate = new Date()
    .toLocaleString('en-IN', {timeZone: 'Asia/Kolkata', hour12: false})
    .replace(',', '');

  // const handleIn = () => {
  //   if (ScannedData !== '') {
  //     const url = `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${LocationCode}&b=${PassNo}&c=${TruckNo}&d=0&e=${UserName}&f=${newdate}`;

  //     console.log('API URL:', url);
  //     console.log('in');
  //     const requestOptions = {
  //       method: 'POST',
  //       redirect: 'follow',
  //     };
  //     fetch(
  //       `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${LocationCode}&b=${PassNo}&c=${TruckNo}&d=0&e=${UserName}&f=${newdate}`,
  //       requestOptions,
  //     )
  //       .then(response => response.text())
  //       .then(result => {
  //         console.log(result);
  //         if (result.includes('SUCCESS')) {
  //           Dialog.show({
  //             type: ALERT_TYPE.SUCCESS,
  //             title: '',
  //             textBody: result,
  //             button: 'close',
  //             onHide: () => {
  //               setScannedData('');
  // setPassNo('');
  // setTruckNo('');
  //             },
  //           });
  //         } else {
  //           Dialog.show({
  //             type: ALERT_TYPE.INFO,
  //             title: '',
  //             textBody: result,
  //             button: 'close',
  //             onHide: () => {
  //               setScannedData('');
  // setPassNo('');
  // setTruckNo('');
  //             },
  //           });
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         Dialog.show({
  //           type: ALERT_TYPE.INFO,
  //           title: 'ERROR',
  //           textBody: 'Something Went Wrong',
  //           button: 'close',
  //         });
  //       });
  //   } else {
  //     Toast.show({
  //       type: ALERT_TYPE.DANGER,
  //       title: 'ERROR',
  //       textBody: 'Scan Data First',
  //     });
  //   }
  // };
  // const handleOut = () => {
  //   const url = `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${LocationCode}&b=${PassNo}&c=${TruckNo}&d=1&e=${UserName}&f=${newdate}`;

  //   console.log('API URL:', url);
  //   if (ScannedData !== '') {
  //     const requestOptions = {
  //       method: 'POST',
  //       redirect: 'follow',
  //     };
  //     fetch(
  //       `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${LocationCode}&b=${PassNo}&c=${TruckNo}&d=1&e=${UserName}&f=${newdate}`,
  //       requestOptions,
  //     )
  //       .then(response => response.text())
  //       .then(result => {
  //         console.log(result);
  //         if (result.includes('SUCCESS')) {
  //           Dialog.show({
  //             type: ALERT_TYPE.SUCCESS,
  //             title: '',
  //             textBody: result,
  //             button: 'close',
  //             onHide: () => {
  //               setScannedData('');
  // setPassNo('');
  // setTruckNo('');
  //             },
  //           });
  //         } else {
  //           Dialog.show({
  //             type: ALERT_TYPE.INFO,
  //             title: '',
  //             textBody: result,
  //             button: 'close',
  //             onHide: () => {
  //               setScannedData('');
  // setPassNo('');
  // setTruckNo('');
  //             },
  //           });
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         Dialog.show({
  //           type: ALERT_TYPE.INFO,
  //           title: 'ERROR',
  //           textBody: 'Something Went Wrong',
  //           button: 'close',
  //         });
  //       });
  //   } else {
  //     Toast.show({
  //       type: ALERT_TYPE.DANGER,
  //       title: 'ERROR',
  //       textBody: 'Scan Data First',
  //     });
  //   }
  // };

  const HandleOutput = output => {
    if (PassNo !== '' && TruckNo !== '') {
      if (isConnected) {
        const url = `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${LocationCode}&b=${PassNo}&c=${TruckNo}&d=${
          output ? 0 : 1
        }&e=${UserName}&f=${newdate}`;

        console.log('API URL:', url);
        console.log('in');
        const requestOptions = {
          method: 'POST',
          redirect: 'follow',
        };
        fetch(
          `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${LocationCode}&b=${PassNo}&c=${TruckNo}&d=${
            output ? 0 : 1
          }&e=${UserName}&f=${newdate}`,
          requestOptions,
        )
          .then(response => response.text())
          .then(result => {
            console.log(result);
            if (result.includes('SUCCESS')) {
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: '',
                textBody: result,
                button: 'close',
                onHide: () => {
                  setScannedData('');
                  setPassNo('');
                  setTruckNo('');
                },
              });
            } else {
              Dialog.show({
                type: ALERT_TYPE.INFO,
                title: '',
                textBody: result,
                button: 'close',
                onHide: () => {
                  setScannedData('');
                  setPassNo('');
                  setTruckNo('');
                },
              });
            }
          })
          .catch(error => {
            console.error(error);
            Dialog.show({
              type: ALERT_TYPE.INFO,
              title: 'ERROR',
              textBody: 'Something Went Wrong',
              button: 'close',
            });
          });
      } else {
        setScannedData('');
        setPassNo('');
        setTruckNo('');
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'History',
          textBody: 'Offline Data Added',
        });
        storeFetchEntry(
          LocationCode,
          PassNo,
          TruckNo,
          output ? 0 : 1,
          UserName,
          newdate,
        );
      }
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'ERROR',
        textBody: 'Scan Data First',
      });
    }
  };
const [isLocationCodeAvailable,setIsLocationCodeAvailable]=useState(false)
useEffect(() => {
  const checkLocationCode = async () => {
    try {
      const value = await AsyncStorage.getItem('LocationCode');
      if (value) {
        setIsLocationCodeAvailable(true)
        console.log('islocationavailable',value)
      } else {
        setIsLocationCodeAvailable(false)
        console.log('islocationavailable','false')
      }
    } catch (error) {
      console.error('Error retrieving location code', error);
      setIsLocationCodeAvailable(false)
    }
  };

  checkLocationCode();
}, []);

  return (
    <AlertNotificationRoot>
      <NetworkError />
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'white'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardHeight}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            {backgroundColor: 'white'},
          ]}
          showsVerticalScrollIndicator={false}>
          {IsLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '90%',
              }}>
              <ActivityIndicator
                animating={true}
                color="#276A76"
                size="large"
              />

              <Text
                style={{
                  color: '#276A76',
                  textAlign: 'center',
                  fontSize: 15,
                  textTransform: 'uppercase',
                  fontFamily: 'PoppinsBold',
                  marginTop: 5,
                  letterSpacing: 2,
                }}>
                Loading
              </Text>
            </View>
          ) : (
            <View style={styles.container}>
              {/* Header==================================== */}
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: 60,
                  padding: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../screen/assets/tranzolLogo.png')}
                    style={{width: 50, height: 50}}
                  />
                  <Text
                    style={{
                      fontWeight: 900,
                      fontSize: isFine ? 18 : 20,
                      color: '#276A76',
                      // textAlign:"center"
                      margin: 'auto',
                    }}>
                    Tranzol
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    // backgroundColor: 'red',
                    // marginVertical: 'auto',
                    marginTop: 10,
                    marginRight: 10,
                  }}>
                  <TouchableOpacity
                    style={{padding: 0, margin: 0, height: '90%'}}
                    onPress={handleOpenModal}
                    disabled={isLocationCodeAvailable} >
                    <Text
                      style={{
                        color: '#276A76',
                        textAlign: 'center',
                        fontSize: isFine ? 15 : 18,
                        fontWeight: '700',
                        marginRight: 5,

                        height: '100%',
                        textAlignVertical: 'center',
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
                      {LocationCode}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{padding: 0, marginTop: 5, height: '100%'}}
                    onPress={() => {
                      Alert.alert(
                        'Sign Out',
                        'Do you want to continue?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              AsyncStorage.setItem('response', '');
                              AsyncStorage.setItem('UserName', '');
                              AsyncStorage.setItem('LocationCode', '');
                              navigation.replace('Login');
                              storage.clearStore();
                            },
                          },
                        ],
                        {cancelable: true},
                      );
                    }}>
                    <Image
                      source={require('../screen/assets/logout.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#276A76',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* Middle==================================== */}
              <Text
                style={{
                  color: '#276A76',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '700',
                  marginRight: 5,
                  padding: 0,
                  marginBottom: 30,
                  marginTop: 10,
                }}>
                Scanner
              </Text>
              <View
                style={{
                  height: 250,
                  width: 250,
                  backgroundColor: '#276A76',
                  // marginBottom: 20,
                  // marginTop: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto',
                }}>
                {cameraActive ? (
                  <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={cameraActive}
                    codeScanner={codeScanner}
                  />
                ) : (
                  <>
                    <Text style={{color: 'white', fontSize: 12}}>
                      {ScannedData}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 5,
                        marginVertical: '5%',
                        height: 40,
                        width: 130,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setCameraActive(!cameraActive);
                      }}>
                      <Text
                        style={{
                          color: '#276A76',
                          textAlign: 'center',
                          fontSize: 14,
                          letterSpacing: 2,
                          textTransform: 'uppercase',

                          fontWeight: '900',
                        }}>
                        Scan Here
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              {/* Bottom===================================== */}
              <View style={{marginTop: 40}}>
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
                    value={PassNo}
                    onChangeText={PassNo => setPassNo(PassNo)}
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
                    value={TruckNo}
                    onChangeText={TruckNo => setTruckNo(TruckNo)}
                  />
                </View>
              </View>
              {/* Last Buttons=============================== */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 50,
                }}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => {
                    HandleOutput(true);
                  }}>
                  <Text style={styles.text}>In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => {
                    HandleOutput(false);
                  }}>
                  <Text style={styles.text}>Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Modal Data */}
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
                  placeholderTextColor={'black'}
                  placeholder="Enter Code"
                  autoFocus={true}
                  editable={isLocationCodeAvailable? false : true}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // backgroundColor: 'red',
  // },
  scrollView: {
    // flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',

    fontWeight: '900',
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
});
export default ScannerScreen;
