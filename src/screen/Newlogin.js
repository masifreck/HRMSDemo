import { View, Text, TextInput ,StyleSheet,TouchableOpacity, ImageBackground, Image, Alert,
    ToastAndroid
} from 'react-native'
import React, { useState } from 'react'
import { primaryColor } from '../constants/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../component/Loading'



const Newlogin = ({navigation}) => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false)
    const [EmployeeId,setEmployeeId]=useState('')

    const apiUrl = 'https://hrexim.tranzol.com/api/Attendance/Login';

    const myFetchPostRequest = async () => {
    
        if (!username) {
                    Alert.alert('Failed', 'Please Enter Username');

            return;
        }
        if (!password) {
            Alert.alert('Failed', 'Please Enter Password');

            return;
        }
    
        try {
            setLoading(true); // Start loading
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
                ToastAndroid.show('Login failed: Unauthorized', ToastAndroid.SHORT);
                return;
            }
    
            const contentLength = response.headers.get('content-length');
            if (contentLength && parseInt(contentLength) > 0) {
                const responseData = await response.json();
                const result = responseData?.data?.Result; // Extract 'Result'
                const errorMsg = responseData?.data?.ErrorMsg; // Extract 'ErrorMsg'
    
                if (result) {
                    console.log('Login successful, UserID:', result);
                    setEmployeeId(result);
                    await AsyncStorage.setItem("EmployeeId", result);
                    console.log('EmployeeId', result);
                    navigation.replace('DrawerNavigation');
                } else if (errorMsg) {
                    Alert.alert('Login failed', `${errorMsg}`);
                } else {
                    Alert.alert('Unexpected response', ToastAndroid.SHORT);
                }
            } else {
                Alert.alert('Empty response body or no content to parse', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login error occurred', ToastAndroid.SHORT);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    
return (
  <ImageBackground 
    style={{ resizeMode: 'cover', flex: 1 }} 
    source={require('../assets/loginbg.jpg')}
  >
    {loading ? (
      <Loading />
    ) : (
      <>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/mypic.jpeg')} />
          <TextInput 
            style={styles.input}
            placeholder='Enter Username'
            value={username}
            onChangeText={(t) => setUsername(t)}
          />
          <TextInput 
            style={styles.input}
            placeholder='Enter Password'
            value={password}
            onChangeText={(t) => setPassword(t)}
            secureTextEntry
          />
          <TouchableOpacity 
            style={styles.loginbtn}
            onPress={myFetchPostRequest}
          >
            <Text style={styles.btntext}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: primaryColor, height: 50, paddingTop: 10 }}>
          <Text style={styles.tranzol}>POWERED BY TRANZOL</Text>
        </View>
      </>
    )}
  </ImageBackground>
);


}

const styles=StyleSheet.create({
    container:{
flex:1,
justifyContent:'center',
alignItems:'center',paddingHorizontal:20
    },
    input:{
        width:'85%',
        backgroundColor:'#f4d9ff',
        elevation :4,
        height:45,
        borderRadius:10,
        //borderWidth:0.1,
        borderColor:primaryColor,
        marginTop:30,paddingHorizontal:20,
        color:'black'
    },
    logo:{
        width:120,
        height:150,
    },
    loginbtn:{
        backgroundColor:primaryColor,
        width:'85%',
        height:50,
        borderRadius:15,
        elevation:4,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    },
    btntext:{
        color:'white',
        fontSize:17,
        fontWeight:'bold'
    },
    tranzol:{
        fontSize:14,
        fontWeight:'bold',
        alignSelf:'center',
        color:'white',
        elevation:4,
        paddingBottom:10
    }
})

export default Newlogin