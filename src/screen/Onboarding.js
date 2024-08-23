import React, { useState } from "react";
import { View, Text, Image,StatusBar  } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from '../constants/theme';
import { useNavigation } from "@react-navigation/native";

const slides = [
  {
    id: 1,
    title: 'Best Employee Service with Management',
    description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require('../assets/onboardScreen1.png')
  },
  {
    id: 2,
    title: 'Quick Attendance at any where',
    description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require('../assets/onboardScreen2.png')
  },
  {
    id: 3,
    title: 'P',
    description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require('../assets/onboardScreen3.png')
  }
]

export default function Onboarding() {

  StatusBar.setBarStyle('dark-content', true);
  StatusBar.setBackgroundColor('#d6d5d3');
  
  const navigation=useNavigation();

  const buttonLabel = (label) => {
    return(
      <View style={{
        padding: 12
      }}>
        <Text style={{
          color: COLORS.title,
          fontWeight: '600',
          fontSize: SIZES.h4,
        }}>
          {label}
        </Text>
      </View>
    )
  }

  return(
    <AppIntroSlider
      data={slides}
      renderItem={({item}) => {
        return(
          <View style={{
            flex: 1,
            alignItems: 'center',
            padding: 15,
            backgroundColor:'#d6d5d3',
          }}>
            <Image
              source={item.image}
              style={{
                width: SIZES.width-100,
                height: 400,
              }}
              resizeMode="contain"
            />
            <Text style={{
              fontWeight: 'bold',
              color: COLORS.title,
              fontSize: SIZES.h1,
            }}>
              {item.title}
            </Text>
            <Text style={{
              textAlign: 'center',
              paddingTop: 5,
              color: COLORS.title
            }}>
              {item.description}
            </Text>
          </View>
        )
      }}
      activeDotStyle={{
        backgroundColor: COLORS.primary,
        width: 30,
      }}
      showSkipButton
      renderNextButton={() => buttonLabel("Next")}
      renderSkipButton={() => buttonLabel("Skip")}
      renderDoneButton={() => buttonLabel("Done")}
      onDone={() => {
        navigation.replace('Login')
      }}
    />
  )
}