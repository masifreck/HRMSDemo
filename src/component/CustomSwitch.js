import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
  width
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: width,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#aa18ea',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center',
        shadowColor: 'black',
      shadowOffset: {
        width: 1,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? '#aa18ea' : 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : '#aa18ea',
            fontSize: 14,
            // fontFamily: 'Roboto-Medium',
            fontWeight:'600'
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? '#aa18ea' : 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : '#aa18ea',
            fontSize: 14,
            // fontFamily: 'Roboto-Medium',
            fontWeight:'600'
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
