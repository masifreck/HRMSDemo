
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';

const deviceWidth = Dimensions.get('window').width;

const NewExpense = ({ navigation, route }) => {
    // Function to handle saving the expense and returning to the previous screen
    const handleSaveExpense = () => {
        const total = Number(fare) + Number(fooding) + Number(lodging) + Number(misc);
        const expenseDetails = {
            selectedDate,
            jobNumber,
            fromPlace,
            toPlace,
            kilometers,
            fare,
            fooding,
            lodging,
            misc,
            remark,
            travelType,
            total
        };

        if (route.params && route.params.onSave) {
            route.params.onSave(expenseDetails);
        }
        navigation.goBack();
    };
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('dd-mm-yyyy');
    const [jobNumber, setJobNumber] = useState('');
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [kilometers, setKilometers] = useState(0.00);
    const [fare, setFare] = useState(0.00);
    const [fooding, setFooding] = useState(0.00);
    const [lodging, setLodging] = useState(0.00);
    const [misc, setMisc] = useState(0.00);
    const [remark, setRemark] = useState('');

    const [travelType, setTravelType] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
    ];

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB');
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <View >
                        <Text style={styles.label}>
                            Pick Date <Text style={styles.required}>*</Text>
                        </Text>
                        <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
                            <Text style={styles.dateText}>{selectedDate}</Text>
                            <AntDesign name="calendar" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.label}>Job Number</Text>
                        <TextInput
                            style={styles.input}
                            value={jobNumber}
                            onChangeText={setJobNumber}
                            placeholder="Enter Job Number"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 6 }}>
                    <Text style={styles.label}>From Place</Text>
                    <TextInput
                        style={styles.input}
                        value={fromPlace}
                        onChangeText={setFromPlace}
                        placeholder="Enter From Place"
                        placeholderTextColor="gray"
                    />
                </View>
                <View style={{ marginTop: 6 }}>
                    <Text style={styles.label}>To Place</Text>
                    <TextInput
                        style={styles.input}
                        value={toPlace}
                        onChangeText={setToPlace}
                        placeholder="Enter To Place"
                        placeholderTextColor="gray"
                    />
                </View>

                <View style={[styles.rowContainer, { marginTop: 6 }]}>
                    <View>
                        <Text style={styles.label}>
                            Travel Type <Text style={styles.required}>*</Text>
                        </Text>
                        {/* Dropdown component goes here */}
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={{ color: 'black' }}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Travel Type' : '...'}
                            searchPlaceholder="Search..."
                            value={travelType}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setTravelType(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>
                    <View style={{ marginLeft: 10, width: (deviceWidth * 0.42) - 20 }}>
                        <Text style={styles.label}>
                            Kilometers <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={kilometers}
                            onChangeText={setKilometers}
                            placeholder="Enter Kilometers"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={[styles.rowContainer, { marginTop: 6 }]}>
                    <View style={[styles.columnContainer, { marginRight: 5 }]}>
                        <Text style={styles.label}>
                            Fare <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={fare}
                            onChangeText={setFare}
                            placeholder="Enter Fare"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.columnContainer, { marginLeft: 5 }]}>
                        <Text style={styles.label}>
                            Fooding <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={fooding}
                            onChangeText={setFooding}
                            placeholder="Enter Fooding"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={[styles.rowContainer, { marginTop: 6 }]}>
                    <View style={[styles.columnContainer, { marginRight: 5 }]}>
                        <Text style={styles.label}>
                            Lodging <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={lodging}
                            onChangeText={setLodging}
                            placeholder="Enter Lodging"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.columnContainer, { marginLeft: 5 }]}>
                        <Text style={styles.label}>
                            Misc. Expense <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={misc}
                            onChangeText={setMisc}
                            placeholder="Enter Misc. Expense"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 6 }}>
                    <Text style={styles.label}>Remark</Text>
                    <TextInput
                        style={styles.input}
                        value={remark}
                        onChangeText={setRemark}
                        placeholder="Enter Remark"
                        placeholderTextColor="gray"
                        multiline
                    />
                </View>

                <TouchableOpacity style={[styles.button, { marginTop: 20 }]}
                    onPress={handleSaveExpense}>
                    <Text style={styles.buttonText}>
                        Add Expense
                    </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 10,
    },
    columnContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'black',
        marginLeft: 6
    },
    required: {
        color: 'red',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        height: 50,
        justifyContent: 'space-between',
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
    dateText: {
        // flex: 1,
        color: 'gray',
        marginRight: 10,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dropdown: {
        height: 50,
        width: (deviceWidth * 0.58) - 20,
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
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aa18ea',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default NewExpense;
