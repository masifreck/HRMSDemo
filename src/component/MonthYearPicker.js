import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

const MonthYearPicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handlePickerChange = (event, newDate) => {
    const selectedDate = newDate || date;
    setShowPicker(Platform.OS === 'ios');
    setSelectedDate(selectedDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const formatDate = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <View style={{
      marginHorizontal:10,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row', marginTop: 10
    }}>
      {selectedDate && (
        <Text style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 19,textAlign:'center',
          marginLeft:8
        }}>{formatDate(selectedDate)}</Text>
      )}

      <TouchableOpacity style={[styles.btn, {
        width: '55%',
        backgroundColor: '#aa18ea',
      }]} onPress={showDatepicker}>
        <Text style={[styles.txt]}>Select Month & Year</Text>
      </TouchableOpacity>

      {showPicker && (
        <MonthPicker
          value={selectedDate} // Make sure to pass the selected date as the value prop.
          onChange={handlePickerChange} // onChange prop has been changed to onValueChange.
          maximumDate={new Date()} // You can set a maximum date to restrict future selections.
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden'
  },
  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
})

export default MonthYearPicker;
