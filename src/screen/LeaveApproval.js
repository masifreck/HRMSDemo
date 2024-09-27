
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, TextInput } from 'react-native';

const LeaveApproval = () => {
    const [activeTab, setActiveTab] = useState('pending');

    // Mock data for pending requests and history
    const pendingRequests = [
        {
            id: '1',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },
        {
            id: '2',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },
        {
            id: '3',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },
        {
            id: '4',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },
        {
            id: '5',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },
        {
            id: '6',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },
        {
            id: '7',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },
        {
            id: '8',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-06-20',
            leaveType: 'Annual Leave',
            leaveDate: '2023-07-01',
            duration: 'Full Day',
            leaveBalance: '5 days',
            reason: 'Vacation',
            photo: require('../assets/mypic.jpeg'),
        },

        // Add more pending requests here
    ];

    const history = [
        {
            id: '1',
            employeeName: 'Mohd Asif',
            branch: 'ELPL-FLEET BACK OFFICE',
            department: 'Fleet Operations',
            designation: 'Supervisor',
            appliedOn: '2023-05-15',
            leaveType: 'Sick Leave',
            leaveDate: '2023-06-10',
            duration: 'Half Day',
            leaveBalance: '3 days',
            reason: 'Medical appointment',
            photo: require('../assets/mypic.jpeg'),
        },
        // Add more history items here
    ];

    const renderRequests = ({ item }) => (
        <View style={styles.cardContainer}>

            <View style={{paddingBottom:10,marginBottom:10,borderBottomColor:'lightgray',borderBottomWidth:0.5}}>
                <View style={styles.fastContainer}>
                    <View style={styles.employeeInfoContainer}>
                        <Image source={item.photo} style={styles.employeePhoto} />
                        <View style={styles.employeeDetails}>
                            <Text style={styles.employeeName}>{item.employeeName}</Text>

                            <Text style={styles.employeeDesignation}>{item.designation}</Text>
                        </View>
                    </View>
                    <View style={styles.appliedOnContainer}>
                        <Text style={styles.appliedOnText}>Applied on</Text>
                        <Text style={styles.appliedOnDate}>{item.appliedOn}</Text>
                    </View>
                </View>
                <View style={styles.fastContainer}>
                    <View style={{justifyContent:'center'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', fontWeight: '600', paddingRight: 8 }}>Branch :</Text>
                            <Text style={styles.employeeBranch}>{item.branch}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', fontWeight: '600', paddingRight: 8 }}>Department :</Text>
                            <Text style={styles.employeeDepartment}>{item.department}</Text>
                        </View>
                    </View>
                    <View style={ styles.leaveTypeContainer}>
                        <Text style={{fontSize:12,color:'green'}}>{item.leaveType}</Text>
                    </View>
                </View>
            </View>
            <View style={{marginBottom:10}}>

                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Leave Date:</Text>
                    <Text style={styles.leaveInfoValue}>{item.leaveDate}</Text>
                </View>
                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Duration:</Text>
                    <Text style={styles.leaveInfoValue}>{item.duration}</Text>
                </View>
                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Leave Balance:</Text>
                    <Text style={styles.leaveInfoValue}>{item.leaveBalance}</Text>
                </View>
                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Reason:</Text>
                    <Text style={styles.leaveInfoValue}>{item.reason}</Text>
                </View>
                <TextInput
                    style={styles.remarkInput}
                    multiline
                    placeholder="Add remark"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.approveButton]}>
                    <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    const renderHistory = ({ item }) => (
        <View style={styles.cardContainer}>

            <View style={{paddingBottom:10,marginBottom:10,borderBottomColor:'lightgray',borderBottomWidth:0.5}}>
                <View style={styles.fastContainer}>
                    <View style={styles.employeeInfoContainer}>
                        <Image source={item.photo} style={styles.employeePhoto} />
                        <View style={styles.employeeDetails}>
                            <Text style={styles.employeeName}>{item.employeeName}</Text>

                            <Text style={styles.employeeDesignation}>{item.designation}</Text>
                        </View>
                    </View>
                    <View style={styles.appliedOnContainer}>
                        <Text style={styles.appliedOnText}>Applied on</Text>
                        <Text style={styles.appliedOnDate}>{item.appliedOn}</Text>
                    </View>
                </View>
                <View style={styles.fastContainer}>
                    <View style={{justifyContent:'center'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', fontWeight: '600', paddingRight: 8 }}>Branch :</Text>
                            <Text style={styles.employeeBranch}>{item.branch}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', fontWeight: '600', paddingRight: 8 }}>Department :</Text>
                            <Text style={styles.employeeDepartment}>{item.department}</Text>
                        </View>
                    </View>
                    <View style={ styles.leaveTypeContainer}>
                        <Text style={{fontSize:12,color:'green'}}>{item.leaveType}</Text>
                    </View>
                </View>
            </View>
            <View style={{marginBottom:10}}>

                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Leave Date:</Text>
                    <Text style={styles.leaveInfoValue}>{item.leaveDate}</Text>
                </View>
                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Duration:</Text>
                    <Text style={styles.leaveInfoValue}>{item.duration}</Text>
                </View>
                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Leave Balance:</Text>
                    <Text style={styles.leaveInfoValue}>{item.leaveBalance}</Text>
                </View>
                <View style={styles.leaveInfoItem}>
                    <Text style={styles.leaveInfoLabel}>Reason:</Text>
                    <Text style={styles.leaveInfoValue}>{item.reason}</Text>
                </View>
                <TextInput
                    style={styles.remarkInput}
                    multiline
                    value='Take rest'
                    editable={false}
                />
            </View>

                <View style={[styles.button, styles.approveButton]}>
                    <Text style={styles.buttonText}>Approveed</Text>
                </View>
                {/* <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity> */}
        </View>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={activeTab === 'pending' ? pendingRequests : history}
                renderItem={activeTab === 'pending' ? renderRequests : renderHistory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.requestsList}
            />
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                    onPress={() => setActiveTab('pending')}
                >
                    <Text style={[styles.tabText, activeTab === 'pending' && { color: '#aa18ea' }]}>Pending Requests</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && { color: '#aa18ea' }]}>History</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f7f0fa',
        backgroundColor: '#e9e6eb'
    },
    tabsContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 16,
        // backgroundColor: '#f2f2f2',
        backgroundColor: '#f7f0fa',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#aa18ea',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#736f71'

    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    approveButton: {
        backgroundColor: 'green',
    },
    rejectButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    requestsList: {
        flexGrow: 1,
    },
    cardContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    fastContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    employeeInfoContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    employeePhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    employeeDetails: {
        flexDirection: 'column',
    },
    employeeName: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#736f71',
        fontSize: 18
    },
    employeeBranch: {
        marginBottom: 2,
        color:'gray'
    },
    employeeDepartment: {
        marginBottom: 2,
        color:'gray'
    },
    employeeDesignation: {
        marginBottom: 2,
        color:'gray'
    },
    appliedOnContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    appliedOnText: {
        marginBottom: 2,
        color:'gray'
    },
    appliedOnDate: {
        fontWeight: 'bold',
        color:'gray'
    },
    leaveTypeContainer: {
        borderWidth: 0.8,
        borderColor: 'green',
        borderRadius: 8,
        padding: 4,
        // height:20,
        alignSelf:'center'
        // marginBottom: 4,
    },
    leaveInfoItem: {
        flexDirection: 'row',
        marginBottom: 4,
        justifyContent:'space-between'
    },
    leaveInfoLabel: {
        fontWeight: 'bold',
        marginRight: 4,
        color:'gray'
    },
    leaveInfoValue: {
        marginRight: 4,
        color:'gray'
    },
    remarkInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        color:'black'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default LeaveApproval;
