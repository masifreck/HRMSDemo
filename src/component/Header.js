import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity,StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const { height, widht } = Dimensions.get('window');

const Header = () => {
    const navigation = useNavigation();
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor('#e8d7f5');
    return (
        <View style={styles.header}>
            <View style={{flexDirection:'row'}}>
                {/* <TouchableOpacity style={styles.threeDot} onPress={()=>{navigation.openDrawer()}}>
                    <Image style={styles.threeDotImg} source={require('../assets/menus.png')} />
                </TouchableOpacity> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 26, width: 180, marginLeft: 10,tintColor:'black' }} source={require('../assets/people-builder.png')} />
                </View>
            </View>
            <TouchableOpacity onPress={() => { }} style={styles.scanButton}>
                {/* <Image  style={styles.scanButton} /> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.scanButton}>
                <Image source={require('../assets/notification.png')} style={styles.scanButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={[styles.scanButton,{marginRight:10}]}>
                <Image source={require('../assets/menu.png')} style={styles.scanButton} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: widht,
        height: 60,
        backgroundColor: '#e8d7f5',
        flexDirection: 'row',
        justifyContent: "space-between",
       
    },
    txt: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    scanButton: {
        height: 20,
        width: 20,
        // marginRight: 10,
        marginVertical: 8,
        tintColor: 'black',
    },
    threeDot: {
       
    },
    threeDotImg: {
        height: 20,
        width: 20,
        tintColor: '#1e4175',
        alignSelf: 'center',
    },

})

export default Header