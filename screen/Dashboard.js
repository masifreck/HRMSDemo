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
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
const {width: screenWidth} = Dimensions.get('window');
const containerWidth = screenWidth / 1.3;
const Dashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params;

  const handleScanTPPress = () => {
    navigation.navigate('ScannerTP');
  };

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 38, // Adjust this value based on your screen height
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
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#276A76',
          textAlign: 'center',
          fontSize: 20,
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontWeight: '900',
          marginTop: 20,
          // alignSelf:"flex-start",
          // justifyContent:"flex-start"
        }}>
        Result
      </Text>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View
          style={{
            height: '50%',
            width: containerWidth,
            backgroundColor: '#276A76',
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontSize: 14, padding: 5}}>{data}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleScanTPPress}>
          <View style={styles.logocontainer}>
            <Image
              source={require('../screen/assets/qr.png')}
              style={styles.logo}
            />
            <Animated.View style={[styles.line, {transform: [{translateY}]}]} />
          </View>
          <Text style={styles.text}>Scan Again</Text>
        </TouchableOpacity>
      </View>
    </View>
    // <View style={styles.container}>

    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // alignContent: 'center',
  },
  logocontainer: {
    width: '30%',
    height: '80%',
    position: 'relative', // Ensures absolute positioning works
    // backgroundColor: 'black',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    tintColor: 'white',
    resizeMode: 'contain',
    // backgroundColor:"red"
  },
  button: {
    backgroundColor: '#276A76',
    borderRadius: 5,
    marginVertical: '10%',
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  text: {
    color: 'white',
    // textAlign: 'center',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '500',
    textTransform: 'uppercase',
    // backgroundColor:"black"

    // fontFamily: 'PoppinsBold',
  },
  line: {
    width: '80%',
    height: 2,
    backgroundColor: 'red',
    position: 'absolute',
  },
});

export default Dashboard;
