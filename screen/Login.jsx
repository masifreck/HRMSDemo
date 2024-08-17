import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
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

const wW = Dimensions.get('screen').width;
const wH = Dimensions.get('screen').height;
let isFine;
wW < 400 ? (isFine = true) : (isFine = false);

const Login = () => {
  console.log(isFine, wW);
  const navigation = useNavigation();
  const [IsLoading, setIsLoading] = useState(false);
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');

  useEffect(() => {
    console.log(UserName, Password);
  }, []);
  const Warning = ({Type_warning = 'a', title, body}) => {
    if (Type_warning === 'e') {
      // Assuming ALERT_TYPE.WARNING is defined elsewhere in your code
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: title,
        textBody: body,
        button: 'close',
      });
    } else {
      // Assuming ALERT_TYPE.DANGER is defined elsewhere in your code
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: title,
        textBody: body,
        button: 'close',
      });
    }
  };

  const Authenticate = () => {
    if (UserName.length !== 0 || Password.length !== 0) {
      setIsLoading(true);

      const raw = '';

      const requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow',
      };

      fetch(
        `https://tsm.tranzol.com/api/v2/authenticate?u=${UserName}&p=${Password}`,
        requestOptions,
      )
        .then(response => response.text())

        .then(result => {
          console.log('result', result, typeof result);
          if (result.includes('SUCCESS')) {
            AsyncStorage.setItem('response', result);
            AsyncStorage.setItem('UserName', UserName);
            setIsLoading(false);
            console.log(result);
            navigation.replace('MainScreen');
          } else {
            setIsLoading(false);
            console.log(result);
            Warning({
              Type_warning: 'e',
              title: 'Invalid Credentials',
              body: 'ERROR',
            });
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error);
          Warning({
            Type_warning: 'e',
            body: 'Check Internet Connection',
            title: 'Network Error',
          });
        });
      setUserName('');
      setPassword('');
    } else {
      Warning({
        Type_warning: 'e',
        title: 'Invalid Credentials',
        body: 'ERROR',
      });
    }
    // navigation.navigate('Home');
  };
  const [passwordVisible, setpasswordVisible] = useState(false);

  const showPassword = () => {
    console.log(passwordVisible);
    setpasswordVisible(!passwordVisible);
  };

  return (
    <AlertNotificationRoot>
      <StatusBar backgroundColor="#276A76" />
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{backgroundColor: 'white'}}>
        {!IsLoading && <View style={styles.tiltedBackground1}></View>}

        <View style={styles.container}>
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
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: wH / 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginBottom: '10%',
                  left: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'PoppinsMedium',
                    color: '#276A76',
                    fontSize: isFine ? 13 : 15,
                  }}>
                  Proceed With Your
                </Text>
                <Text
                  style={{
                    fontFamily: 'PoppinsExtraBold',
                    fontSize: isFine ? 28 : 30,
                    color: '#276A76',
                  }}>
                  Login
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#276A76',
                    alignSelf: 'flex-start',
                    // fontSize: 23,
                    left: 10,
                    fontSize: isFine ? 10 : 13,
                    // fontFamily: 'PoppinsBold',
                  }}>
                  Enter Username
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholderTextColor={'#e0e0e0'}
                    style={{
                      // paddingLeft: 30,
                      color: 'black',
                      fontSize: isFine ? 13 : 15,
                      width: '90%',
                      fontFamily: 'PoppinsRegular',
                    }}
                    placeholder={'Enter Username'}
                    value={UserName}
                    autoCorrect={false}
                    onChangeText={t => setUserName(t)}
                  />
                  <Image
                    source={require('../screen/assets/user.png')}
                    style={styles.logo}
                  />
                </View>

                <Text
                  style={{
                    color: '#276A76',
                    alignSelf: 'flex-start',
                    // fontSize: 23,
                    left: 10,
                    fontSize: isFine ? 10 : 13,
                    // fontFamily: 'PoppinsBold',
                  }}>
                  Enter Password
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    placeholderTextColor={'#e0e0e0'}
                    style={{
                      // paddingLeft: 30,
                      color: 'black',
                      fontSize: isFine ? 13 : 15,
                      width: '90%',
                      justifyContent: 'center',
                      alignContent: 'center',
                      fontFamily: 'PoppinsRegular',
                      // backgroundColor:"red"
                    }}
                    placeholder={'Enter Password'}
                    value={Password}
                    secureTextEntry={!passwordVisible}
                    autoCorrect={false}
                    onChangeText={t => setPassword(t)}
                  />
                  <Pressable onPress={showPassword}>
                    {passwordVisible ? (
                      <Image
                        source={require('../screen/assets/eye.png')}
                        style={styles.logo}
                      />
                    ) : (
                      <Image
                        source={require('../screen/assets/close-eye.png')}
                        style={styles.logo}
                      />
                    )}
                  </Pressable>
                </View>

                <TouchableOpacity style={styles.button} onPress={Authenticate}>
                  <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'red',
    paddingTop: StatusBar.currentHeight,
    // marginTop: '25%',
  },

  inputContainer: {
    height: isFine ? wH * 0.07 : wH * 0.07,
    width: isFine ? wW * 0.9 : wW * 0.9,
    // backgroundColor: 'red',

    // paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: '3%',
    marginBottom: '5%',
    borderBlockColor: '#276A76',
    borderBottomWidth: 1,
    flexDirection: 'row',
    // borderColor:'#5d92d4',
    // shadowColor: '#276A76',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
  },
  logo: {
    // width: "auto",
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // marginTop: 40,
    // backgroundColor: 'red',
    tintColor: '#276A76',
  },
  img: {
    width: 450,
    height: 250,
    marginTop: 10,
    marginBottom: 10,
  },
  txt: {
    fontSize: 18,
    // 20
    // fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily:"PoppinsExtraBold"
    fontFamily: 'PoppinsRegular',
    letterSpacing: 1,
  },
  txt1: {
    fontSize: 20,
    // 28
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    color: '#276A76',
    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 50, // for Android
  },

  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  rrightIcon: {
    position: 'absolute',
    right: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    height: isFine ? wH * 0.06 : wH * 0.06,
    width: isFine ? wW * 0.9 : wW * 0.9,
    backgroundColor: '#276A76',
    borderRadius: 10,
    marginVertical: '10%',
    // height: '15%',
    // width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: isFine ? 14 : 16,

    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'PoppinsBold',
  },
  inputError: {
    borderColor: 'red', // add red border color if mobile number is not valid
  },
  errorText: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    marginTop: 5,
  },
  tiltedBackground1: {
    position: 'absolute',
    top: -150,
    right: 0,
    width: '200%', // Make it wider than 100% to ensure the tilt covers the screen width
    height: 300, // Adjust height as needed
    backgroundColor: '#276A76', // Change to desired background color
    transform: [{rotate: '-20deg'}], // Adjust the angle as needed
  },
});

export default Login;
