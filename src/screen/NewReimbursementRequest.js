
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, TextInput, ScrollView, LogBox } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import Uploading from '../component/Uploading';
LogBox.ignoreAllLogs();

const deviceWidth = Dimensions.get('window').width;

const NewReimbursementRequest = ({ navigation }) => {
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [description, setDescription] = useState('');
    const [claimAmmount, setClaimAmmount] = useState(0.00);
    const fileListHeight = selectedDocuments.length * 60;
    const [isVisible, setIsVisible] = useState(false);

    const [expenseData, setExpenseData] = useState([]);

    // Function to handle navigation to NewExpense screen
    const handleAddExpense = () => {
        navigation.navigate('NewExpense', { onSave: handleSaveExpense });
    };

    // Function to handle saving the expense from NewExpense screen
    const handleSaveExpense = (expenseDetails) => {
        setExpenseData((prevExpenseData) => [...prevExpenseData, expenseDetails]);
        // Update total expense amount
        setClaimAmmount((prevTotalExpense) => prevTotalExpense + expenseDetails.total);
        setIsVisible(true);
    };
    // Function to remove an expense
    const handleRemoveExpense = (index) => {
        setExpenseData((prevExpenseData) => {
            const updatedExpenseData = [...prevExpenseData];
            const removedExpense = updatedExpenseData.splice(index, 1)[0];
            setClaimAmmount((prevClaimAmount) => prevClaimAmount - removedExpense.total);
            return updatedExpenseData;
        });
    };
    // Function to render the list of expenses
    const renderExpenseList = () => {
        return expenseData.map((expense, index) => (
            <View key={index} style={styles.expenseContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.amount}>₹ {expense.total}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{expense.selectedDate}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                }}>
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600' }}>{expense.fromPlace === '' ? 'None' : expense.fromPlace}</Text>
                    <Text style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>- -</Text>
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600' }}>{expense.toPlace === '' ? 'None' : expense.toPlace}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 0.8,
                    paddingBottom: 6,
                    marginBottom: 6,
                    marginTop: 2
                }}>
                    <Text style={{ fontSize: 13, color: 'gray', fontWeight: '500' }}>Travel Type : <Text style={{
                        color: 'green',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}>{expense.travelType}</Text></Text>
                    <Text style={{ fontSize: 13, color: 'gray', fontWeight: '500' }}>Kilometers : <Text style={{
                        color: 'blue',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}>{expense.kilometers}</Text></Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Fare : <Text style={{
                        color: 'green',
                        fontSize: 13,
                        fontWeight: '600'
                    }}> ₹ {expense.fare}</Text></Text>
                    <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Fooding : <Text style={{
                        color: 'green',
                        fontSize: 13,
                        fontWeight: '600'
                    }}> ₹ {expense.fooding}</Text></Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Lodging : <Text style={{
                        color: 'green',
                        fontSize: 13,
                        fontWeight: '600'
                    }}> ₹ {expense.lodging}</Text></Text>
                    <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Misc. Expense : <Text style={{
                        color: 'green',
                        fontSize: 13,
                        fontWeight: '600'
                    }}> ₹ {expense.misc}</Text></Text>
                </View>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 8 }}>{expense.remark == '' ? 'No Remark given by Employee' : expense.remark}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View></View>
                    <TouchableOpacity onPress={() => handleRemoveExpense(index)}>
                        <Text style={{ color: 'red', fontWeight: '700' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    };


    const handleFileIconPress = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });

            const documentsWithProgress = results.map((document) => ({
                ...document,
                progress: 0, // Set initial progress to 0
            }));

            setSelectedDocuments([...selectedDocuments, ...documentsWithProgress]);
        } catch (error) {
            console.log('Document Picker Error:', error);
        }
    };

    const handleRemoveFile = (index) => {
        const updatedDocuments = [...selectedDocuments];
        updatedDocuments.splice(index, 1);
        setSelectedDocuments(updatedDocuments);
    };

    useEffect(() => {
        // Simulating file upload progress
        const interval = setInterval(() => {
            setSelectedDocuments((prevDocuments) => {
                const updatedDocuments = prevDocuments.map((document) => ({
                    ...document,
                    progress: document.progress + 0.1, // Increase progress by 0.1
                }));

                return updatedDocuments;
            });
        }, 200);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const renderFileItem = ({ item, index }) => (
        <View style={[styles.inputContainer, { marginTop: 10, }]}>
            <View style={[styles.fileInfoContainer, { paddingBottom: 6 }]}>
                <Text style={styles.fileName}>{item.name}</Text>
                <Uploading progress={item.progress} width={deviceWidth * 0.65} color={'green'} borderColor={'gray'} />
            </View>

            <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                <Image style={styles.rightIcon} source={require('../assets/minus.png')} />
            </TouchableOpacity>
        </View>
    );


    return (
        <ScrollView style={styles.container}>
            <View style={[styles.rowContainer, { marginHorizontal: 20, marginTop: 16 }]}>
                <View style={styles.columnContainer}>
                    <Text style={styles.claimAmmount}>Claim Amount</Text>
                    <Text style={styles.amount}>₹ {claimAmmount}</Text>
                </View>
                <TouchableOpacity style={styles.attachment} onPress={handleFileIconPress}>
                    <AntDesign name="addfile" size={22} color={'gray'} style={styles.fileIcon} />
                    <Text style={styles.label}>Attachment</Text>
                </TouchableOpacity>
            </View>

            {selectedDocuments.length > 0 && (
                <View style={[styles.fileListContainer, { height: fileListHeight }]}>
                    <FlatList
                        data={selectedDocuments}
                        renderItem={renderFileItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}

            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <Text style={styles.txt}>Journey Description</Text>
                <TextInput
                    style={[styles.input]}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Enter Journey description"
                    placeholderTextColor={'gray'}
                    multiline
                />
            </View>

            <TouchableOpacity style={[styles.button, { marginTop: 20 }]}
                onPress={handleAddExpense}>
                <Text style={styles.buttonText}>
                    Add New Expense
                </Text>
            </TouchableOpacity>
            <View style={styles.expenseList}>{renderExpenseList()}</View>
            {isVisible && expenseData.length > 0 ? (
                <TouchableOpacity style={[styles.button, { marginBottom: 20 }]}>
                    <Text style={styles.buttonText}>Submit Reimbursement Request</Text>
                </TouchableOpacity>
            ) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        backgroundColor: '#e9e6eb',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: '#fff',
    },
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 20,
    },
    attachment: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '25%',
    },
    label: {
        fontSize: 12,
        color: 'gray',
    },
    claimAmmount: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 4,
        color: 'black',
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    fileIcon: {
        marginBottom: 10,
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
        borderColor: 'lightgray',
        borderWidth: 0.8,
        overflow: 'hidden'
    },
    rightIcon: {
        height: 23,
        width: 23,
    },
    fileInfoContainer: {
        alignItems: "flex-start",
        justifyContent: 'center'
    },
    fileName: {
        fontSize: 12,
        color: 'black',
        marginBottom: 4
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
        // marginHorizontal: 20,

    },
    txt: {
        marginBottom: 5,
        color: 'gray',
        fontWeight: '700',
        marginLeft: 6,
        fontSize: 12
    },
    fileListContainer: {
        marginTop: 10,
        overflow: 'hidden',
        marginHorizontal: 20,
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
        marginHorizontal: 20
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    expenseContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    expenseList: {
        marginTop: 16
    }
});

export default NewReimbursementRequest;
