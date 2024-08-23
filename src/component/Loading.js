import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'

const Loading = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView style={{
                height: '50%',
                width: '50%',
                alignSelf: 'center',
                justifyContent: 'center'
            }} source={require('../assets/loading.json')} autoPlay loop />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1,
    }
})
export default Loading