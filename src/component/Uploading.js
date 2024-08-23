import { View, Text } from 'react-native'
import React from 'react'

import * as Progress from 'react-native-progress';

const Uploading = ({progress,width,color,borderColor}) => {
    return (
        <Progress.Bar progress={progress} width={width} color={color} borderColor={borderColor}/>
    )
}

export default Uploading