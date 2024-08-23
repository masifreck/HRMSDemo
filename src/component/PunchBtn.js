import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PunchBtn = ({ isScrolliing }) => {
  const navigation = useNavigation();
  return (
    <View style={{
      position: 'absolute',
      bottom: 20,
      zIndex: 1,
      alignSelf: 'center'

    }}>
      {isScrolliing ?
        <TouchableOpacity
          onPress={() => { navigation.navigate('Punch') }}
          style={styles.ScrollbtnContainer}>
          <Image source={require('../assets/selfie.png')} style={styles.btnImg} />
        </TouchableOpacity> :
        <TouchableOpacity
          onPress={() => { navigation.navigate('Punch') }}
          style={styles.btnContainer}>
          <Image source={require('../assets/selfie.png')} style={styles.btnImg} />
          <Text style={styles.btnText}>Punch</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  ScrollbtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: 70,
    backgroundColor: '#aa18ea',
    borderRadius: 40,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: 150,
    backgroundColor: '#aa18ea',
    borderRadius: 40,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  btnImg: {
    height: 35,
    width: 35,
    tintColor: 'white'
  }
})

export default PunchBtn