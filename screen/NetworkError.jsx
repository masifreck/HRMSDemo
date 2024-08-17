import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const {width} = Dimensions.get('window');
const NetworkError = () => {
  const [isConnected, setIsConnected] = useState(false); // Manually set this to test
  const [isReachable, setisReachable] = useState(false);

  const [initialLoad, setInitialLoad] = useState(true);
  const [letsrun, setletsrun] = useState(false);
  const [show, setShow] = useState(false);

  const translateY = useRef(new Animated.Value(-100)).current; // Start off-screen

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log(
        'here is state ',
        state.isConnected,
        state.isInternetReachable,
      );
      setIsConnected(state.isConnected);
      setisReachable(state.isInternetReachable);
      setletsrun(true);
    });

    // Cleanup the event listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (letsrun) {
      console.log('it is strted');
      console.log('initial load', initialLoad, isConnected);

      if (!initialLoad) {
        // Show online popup if network reconnects and it's not initial load
        if (isConnected) {
          setShow(true);
          Animated.timing(translateY, {
            toValue: 0, // Slide into view
            duration: 300,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            Animated.timing(translateY, {
              toValue: -100, // Slide out of view
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              StatusBar.setBackgroundColor('#276A76'); // Set status bar color to green
              setShow(false);
            });
          }, 3000); // Show for 3 seconds
        } else {
          // Show offline popup if network is disconnected
          setShow(true);
          Animated.timing(translateY, {
            toValue: 0, // Slide into view
            duration: 300,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            Animated.timing(translateY, {
              toValue: -100, // Slide out of view
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              StatusBar.setBackgroundColor('red'); // Set status bar color to red
              setShow(false);
            });
          }, 3000); // Show for 3 seconds
        }
      } else {
        console.log('here is shaitan');
        if (!isConnected) {
          setShow(true);
          Animated.timing(translateY, {
            toValue: 0, // Slide into view
            duration: 300,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            Animated.timing(translateY, {
              toValue: -100, // Slide out of view
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              StatusBar.setBackgroundColor('red'); // Set status bar color to green
              setShow(false);
            });
          }, 3000); // Show for 3 seconds
        }
      }

      // Set initial load to false after handling network status
      setInitialLoad(false);
    }

    // Cleanup the event listener on unmount
  }, [isConnected, letsrun]);

  // Do not render if show is false
  if (!show) return null;

  return (
    <Animated.View
      style={[
        styles.networkStatusContainer,
        {
          transform: [{translateY}],
          backgroundColor: isConnected ? 'green' : 'red',
        },
      ]}>
      <Text style={styles.networkStatusText}>
        {isConnected
          ? isReachable
            ? 'Online'
            : 'Not Stable Connection'
          : 'Offline'}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  networkStatusContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // paddingVertical: 5,
    // paddingHorizontal: width * 0.05, // 5% of screen width
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  networkStatusText: {
    color: 'white',
    fontSize: width * 0.03, // 4% of screen width
    fontFamily: 'PoppinsMedium',
  },
});

export default NetworkError;
