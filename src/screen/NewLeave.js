import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSwitch from '../component/CustomSwitch'
import DocumentPicker from 'react-native-document-picker'
import Uploading from '../component/Uploading';

const deviceWidth = Dimensions.get('window').width;


const NewLeave = () => {

  const [startDate, setStartDate] = useState('Start Date');
  const [endDate, setEndDate] = useState('End Date');
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [emName, setEmName] = useState('');
  const [emNumber, setEmNumber] = useState('');
  const [ofName, setOfName] = useState('');
  const [ofNumber, setOfNumber] = useState('');


  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
  ];

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };

  const [leaveType, setLeaveType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setStartDate(formattedDate);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setEndDate(formattedDate);
    hideEndDatePicker();
  };

  const handleSubmit = () => {
    // Handle form submission here

  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{ color: 'black' }}
          data={data}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Leave Type' : '...'}
          searchPlaceholder="Search..."
          value={leaveType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setLeaveType(item.value);
            setIsFocus(false);
          }}

        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20
        }}>
          <TouchableOpacity style={styles.date} onPress={showStartDatePicker}>
            <AntDesign name="calendar" size={22} color={'gray'} />
            <Text style={styles.buttonText}>{startDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.date} onPress={showEndDatePicker}>
            <AntDesign name="calendar" size={22} color={'gray'} />
            <Text style={styles.buttonText}>{endDate}</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleStartDateConfirm}
          onCancel={hideStartDatePicker}
        />

        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={hideEndDatePicker}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10
        }}>
          <View style={{ width: '48%' }}>
            <Text style={styles.txt}>Start Day</Text>
            <CustomSwitch
              selectionMode={1}
              option1="Full Day"
              option2="Half Day"
              onSelectSwitch={() => { }}
              width={'100%'}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Text style={styles.txt}>End Day</Text>
            <CustomSwitch
              selectionMode={1}
              option1="Full Day"
              option2="Half Day"
              onSelectSwitch={() => { }}
              width={'100%'}
            />
          </View>
        </View>


        <TextInput
          style={[styles.input, { marginTop: 20 }]}
          value={reason}
          onChangeText={(text) => setReason(text)}
          placeholder="Enter reason"
          placeholderTextColor={'gray'}
          multiline
        />
        <View style={{ marginTop: 10 }}>
          <Text style={styles.txt}>Emergency Contact Details (Optional)</Text>
          <TextInput
            style={styles.input}
            value={emName}
            onChangeText={(text) => setEmName(text)}
            placeholder="Enter Name"
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={[styles.input, { marginTop: 10 }]}
            value={emNumber}
            onChangeText={(text) => setEmNumber(text)}
            placeholder="Enter Mobile Number"
            placeholderTextColor={'gray'}
            keyboardType='numeric'
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.txt}>Official Contact Details (Optional)</Text>
          <TextInput
            style={styles.input}
            value={ofName}
            onChangeText={(text) => setOfName(text)}
            placeholder="Enter Name"
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={[styles.input, { marginTop: 10 }]}
            value={ofNumber}
            onChangeText={(text) => setOfNumber(text)}
            placeholder="Enter Mobile Number"
            placeholderTextColor={'gray'}
            keyboardType='numeric'
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.txt}>Attachment (Optional)</Text>
          <View style={styles.inputContainer}>

            <Uploading progress={0.8} width={deviceWidth * 0.7} color={'green'} borderColor={'gray'} />

            <TouchableOpacity onPress={handleDocumentSelection}>
              <AntDesign name="addfile" size={22} color={'gray'} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={{
            fontWeight: 'bold',
            color: 'white',
            paddingLeft: 10
          }}>Submit Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9e6eb',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    // height:100,
    fontSize: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginTop: 20,

  },
  dropdown: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  placeholderStyle: {
    fontSize: 15,
    color: '#6c6f73'
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black'
  },

  date: {
    height: 50,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'gray',
    paddingLeft: 10
  },
  txt: {
    marginBottom: 5,
    color: 'gray',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 12
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aa18ea',
    marginTop: 20,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
});

export default NewLeave;
