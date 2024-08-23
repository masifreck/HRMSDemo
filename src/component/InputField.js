import { View, Text, TextInput , Image } from 'react-native'
import React from 'react'
import styles from '../constants/styles'

const InputField = ({img,textInput}) => {
    return (
        <View style={[styles.textInput,{flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
            <Image style={styles.leftIcon} source={img} />
            {textInput}
        </View>
    )
}

export default InputField