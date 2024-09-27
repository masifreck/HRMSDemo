import * as React from 'react'
import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native'
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import stories from './data'
import LinearGradient from 'react-native-linear-gradient'


export default function Story() {

    return (
            <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>

                {
                    stories.map((story, index) => {
                        return (
                            <TouchableOpacity key={index} >
                                <View style={styles.avatarContainer}>
                                    <LinearGradient colors={['white', 'white', '#C13584']}
                                        style={styles.border} >
                                        <Image
                                            style={[styles.userAvatar, { borderColor: "white" }]}
                                            source={require('../assets/mypic.jpeg')}
                                        />
                                    </LinearGradient>
                                    {/* </View> */}
                                    <Text style={styles.username}>{`${story.username.slice(0, 9)} ${story.username.length > 9 ? ".." : ""}`}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        color: "#fff",
        // marginLeft: 10,
        marginBottom:10

    },
    avatarContainer: {
        padding: 2,
        marginHorizontal:7.5
    },
    border: {
        borderRadius: 100,
        padding: 2,
    },
    userAvatar: {
        height: 70,
        width: 70,
        borderRadius: 100,
        borderWidth: 1,
    },
    username: {
        textAlign: "center",
        width: 70,
        overflow: "hidden",
        fontSize: 12,
        marginTop: 5,
        color: 'black'
    },
})