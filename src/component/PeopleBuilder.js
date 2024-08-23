import { View, Text,Image } from 'react-native'
import React from 'react'

const PeopleBuilder = () => {
  return (
    <Image style={{height:50,width:300,marginLeft:30,marginTop:8}} source={require('../assets/people-builder.png')}/>
  )
}

export default PeopleBuilder