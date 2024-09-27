/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React, { useCallback, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Pressable,
    TouchableOpacity,
    StatusBar,BackHandler,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    withDelay,
    withSpring,
} from "react-native-reanimated";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import Loading from "../component/Loading";




export default function Login() {


    const navigation = useNavigation();
    

    useFocusEffect(
        useCallback(() => {
          const backAction = () => {
            Alert.alert(
              'Exit App',
              'Are you sure you want to exit from HR?',
              [
                {
                  text: 'No',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => BackHandler.exitApp(),
                },
              ],
              { cancelable: false }
            );
            return true;
          };
    
          const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
          return () => backHandler.remove(); // Clean up the event listener when the screen is unfocused
        }, [])
      );

    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor('#afafaf');

    const { height, width } = Dimensions.get("window");
    const imagePosition = useSharedValue(1);
    const formButtonScale = useSharedValue(1);

    // Loading state
    const [loading, setLoading] = useState(false);

    // Login state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
const [EmployeeId,setEmployeeId]=useState('')
    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const loginHandler = () => {
        imagePosition.value = 0;
    };

    // Fetch Data
    const apiUrl = 'https://hrexim.tranzol.com/api/Attendance/Login';

    const myFetchPostRequest = async () => {
        try {
            const url = `${apiUrl}`; // No query params needed
    
            const bodyData = {
                MobileNo: username,    // Set MobileNo as username
                SecureCode: password,  // Set SecureCode as password
            };
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });
    
            console.log('Response Status:', response.status); // Log status code
    
            if (response.status === 401) {
                // Handle unauthorized status
                console.log('Login failed: Unauthorized (401)');
                return;
            }
    
            // Check if there's content in the response before attempting to parse
            const contentLength = response.headers.get('content-length');
            if (contentLength && parseInt(contentLength) > 0) {
                const responseData = await response.json();
                const result = responseData?.data?.Result; // Extract 'Result'
                const errorMsg = responseData?.data?.ErrorMsg; // Extract 'ErrorMsg'
    
                if (result) {
                    console.log('Login successful, UserID:', result);
                    setEmployeeId(result)
                  await  AsyncStorage.setItem("EmployeeId",result);
                  console.log('EmployeeId',result)
                    navigation.replace('DrawerNavigation');
                    // Optional: store userid
                    // await AsyncStorage.setItem('userid', result); 
                } else if (errorMsg) {
                    console.log('Login failed:', errorMsg);
                } else {
                    console.log('Unexpected response:', responseData);
                }
            } else {
                console.log('Empty response body or no content to parse.');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    
    

    // Handle login function
   

    // Login
    const login = async () => {
        if (username === '' || password === '') {
            Alert.alert('Validation Required', 'Fill UserId & Password');
        } else {
            setLoading(true);
            try {
                const response = await myFetchPostRequest();
                if (response.ok && response.status === 200) {
                    formButtonScale.value = withSpring(1.5); // Apply the animation
                    AsyncStorage.setItem("username", username); // Save username in AsyncStorage
                    setLoading(false);
                    navigation.replace('DrawerNavigation'); // Navigate after successful login
                } else {
                    // Handle unsuccessful login
                    setLoading(false);
                    Alert.alert("Validation Failed", "Invalid Login Credential !!");
                   // setUsername('');
                   // setPassword('');
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                Alert.alert("Server Error", 'Something Went Wrong !!');
                ////setUsername('');
                //setPassword('');
            }
        }
    };

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [-height / 1.58, 0]
        );
        return {
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }],
        };
    });

    const buttonsAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }],
        };
    });

    const closeButtonContainerStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
            transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }],
        };
    });

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                imagePosition.value === 0
                    ? withDelay(400, withTiming(1, { duration: 800 }))
                    : withTiming(0, { duration: 300 }),
        };
    });

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: formButtonScale.value }]
        };
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
                {/* Add your SVG image or other content here */}
                <Svg height={height } width={width}>
                    <ClipPath id="clipPathId">
                        <Ellipse cx={width / 2} rx={width} ry={height} />
                    </ClipPath>
                    <Image
                        href={require('../assets/splash.jpg')}
                        width={width}
                        height={height }
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#clipPathId)"
                    />
                </Svg>
            </Animated.View>

            <Animated.View style={[styles.buttonContainer, buttonsAnimatedStyle]}>
                <TouchableOpacity onPress={loginHandler}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
                </TouchableOpacity>
            </Animated.View>

            {loading && <Loading />}

            <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
                <Image style={{width:100,height:100}} source={require('../assets/userl.png')}/>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!showPassword}
                    style={styles.inputField}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Text style={{ color: 'blue' }}>{showPassword ? 'Hide' : 'Show'} Password</Text>
                </Pressable>
                <TouchableOpacity onPress={()=>navigation.navigate('DrawerNavigation')}>
                    <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    buttonContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    formContainer: {
        marginTop: 30,
        width: '80%',
    },
    inputField: {
       // borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        borderRadius:15,
        elevation:4,
        backgroundColor:'white',
        color:'black'
    },
    formButton: {
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 5,
        alignItems: 'center',
    },
});
