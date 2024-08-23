import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Leave = () => {
    const navigation = useNavigation();
    const [expanded, setExpanded] = useState(false);

    // Sample leave data
    const leaves = [
        { date: '2023-06-15', reason: 'Vacation', status: 'Approved' },
        { date: '2023-06-10', reason: 'Sick leave', status: 'Rejected' },
        { date: '2023-06-05', reason: 'Personal reasons', status: 'Pending' },
        { date: '2023-06-05', reason: 'Personal reasons', status: 'Pending' },
        { date: '2023-06-05', reason: 'Personal reasons', status: 'Pending' },
        { date: '2023-06-05', reason: 'Personal reasons', status: 'Pending' },
        { date: '2023-06-05', reason: 'Personal reasons', status: 'Pending' },
        { date: '2023-06-05', reason: 'Personal reasons', status: 'Pending' },
        { date: '2023-06-01', reason: 'Family emergency', status: 'Approved' },
        { date: '2023-05-28', reason: 'Wedding', status: 'Approved' },
        { date: '2023-05-28', reason: 'Wedding', status: 'Approved' },
        { date: '2023-05-28', reason: 'Wedding', status: 'Approved' },
        { date: '2023-05-28', reason: 'Wedding', status: 'Approved' },
        { date: '2023-05-28', reason: 'Wedding', status: 'Approved' },
        { date: '2023-05-28', reason: 'Wedding', status: 'Approved' },
    ];

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const getLeaveStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'green';
            case 'Rejected':
                return 'red';
            case 'Pending':
                return 'orange';
            default:
                return 'black';
        }
    };

    return (
        // <ScrollView style={{ height: '100%' }}>
        <View style={styles.container}>
            <View style={[styles.leaveBox, { height: expanded ? '65%' : '40%' }]}>
                {expanded ? (
                    <ScrollView>
                        {leaves.map((leave, index) => (

                            <TouchableOpacity key={index} style={styles.leaveItem} onPress={()=>{navigation.navigate('LeaveSts')}}>
                                <View style={styles.leaveInfo}>
                                    <Text style={styles.leaveDate}>{leave.date}</Text>
                                    <Text style={styles.leaveReason}>{leave.reason}</Text>
                                </View>
                                <Text style={[styles.leaveStatus, { color: getLeaveStatusColor(leave.status) }]}>
                                    {leave.status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <ScrollView>
                        {leaves.slice(0, 5).map((leave, index) => (
                            <TouchableOpacity key={index} style={styles.leaveItem} onPress={()=>{navigation.navigate('LeaveSts')}}>
                                <View style={styles.leaveInfo}>
                                    <Text style={styles.leaveDate}>{leave.date}</Text>
                                    <Text style={styles.leaveReason}>{leave.reason}</Text>
                                </View>
                                <Text style={[styles.leaveStatus, { color: getLeaveStatusColor(leave.status) }]}>
                                    {leave.status}
                                </Text>

                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                <TouchableOpacity onPress={handleExpand} style={styles.button} >
                    <Text style={styles.buttonText}>{expanded ? 'Hide history' : 'See history'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('NewLeave') }} style={[styles.button, {
                marginTop: 20,
                borderRadius: 10,
                shadowColor: 'black',
                shadowOffset: {
                    width: 1,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }]}>
                <Text style={styles.buttonText}>Request New Leave</Text>
            </TouchableOpacity>
            <View style={[styles.leaveBox, { marginTop: 20 }]}>
                <View style={styles.row}>
                    <Text style={styles.header}>Leave type</Text>
                    <Text style={styles.header}>Allocated</Text>
                    <Text style={styles.header}>Leave taken</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.cell}>Casual Leave</Text>
                    <Text style={styles.cell}>14</Text>
                    <Text style={styles.cell}>10</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.cell}>Sick Leave</Text>
                    <Text style={styles.cell}>7</Text>
                    <Text style={styles.cell}>3</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Earned Leave</Text>
                    <Text style={styles.cell}>7</Text>
                    <Text style={styles.cell}>3</Text>
                </View>
            </View>
        </View>
        // </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#e9e6eb',
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aa18ea',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    leaveBox: {
        borderRadius: 15,
        overflow: 'hidden',
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
    leaveItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: 'lightgray',
        paddingHorizontal:20
    },
    leaveInfo: {
        flex: 1,
    },
    leaveDate: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
    leaveReason: {
        color: 'gray',
        // fontWeight:'600'
    },
    leaveStatus: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    header: {
        fontWeight: 'bold',
        flex: 1,
        marginTop: 8,
        textAlign: 'center',
        color: 'black'
    },
    cell: {
        flex: 1,
        color: 'gray',
        textAlign: 'center'
    },
});

export default Leave;