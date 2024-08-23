import { View, Text,Image } from 'react-native'
import React from 'react'

const Welcome = () => {
  return (
    <Image style={{height:30,width:150,marginLeft:30,marginTop:70}} source={require('../assets/welcome.png')}/>
  )
}

export default Welcome