import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Reimbursement = ({navigation}) => {
    const [activeTab, setActiveTab] = useState('pending');

    const pendingRequests = [
        {
            id: '1',
            date: '2023-06-01',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            claimAmount: '2000',
            approvedAmount: '0',
        },
        {
            id: '2',
            date: '2023-06-02',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            claimAmount: '1500',
            approvedAmount: '1000',
        },
        {
            id: '3',
            date: '2023-06-02',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            claimAmount: '1500',
            approvedAmount: '1000',
        },
        {
            id: '4',
            date: '2023-06-02',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            claimAmount: '1500',
            approvedAmount: '1000',
        },
        {
            id: '5',
            date: '2023-06-02',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            claimAmount: '1500',
            approvedAmount: '1000',
        },
    ];

    const history = [
        {
            id: '3',
            date: '2023-05-28',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            claimAmount: '1800',
            approvedAmount: '1800',
        },
        {
            id: '4',
            date: '2023-05-30',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            claimAmount: '1200',
            approvedAmount: '1200',
        },
    ];

    const renderPendingRequestItem = ({ item }) => (
        <TouchableOpacity style={styles.requestItem} onPress={()=>{navigation.navigate('ReimbursementSts')}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.requestTextContainer}>
                    <View style={styles.amountContainer}>
                        <View style={[styles.dot, styles.orangeDot]} />
                        <Text style={styles.requestText}>Pending</Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.rupeesIcon}>₹</Text>
                        <Text style={styles.amount}>{item.claimAmount}</Text>
                    </View>
                </View>
                <View style={styles.requestTextContainer}>
                    <View style={styles.dateContainer}>
                        <FontAwesome5 name="calendar-alt" size={16} color="gray" />
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.detailsContainer}>

                <Text style={styles.descriptionText} numberOfLines={1}>
                    {item.description}
                    {/* Add "More" button logic here */}
                </Text>
                <View style={styles.approvedContainer}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.approvedTitle}>Approved Amount: </Text>
                        <Text style={styles.rupeesIcon}>₹</Text>
                        <Text style={styles.amount}>{item.approvedAmount}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderHistoryItem = ({ item }) => (

        <TouchableOpacity style={styles.requestItem} onPress={()=>{navigation.navigate('ReimbursementSts')}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.requestTextContainer}>
                    <View style={styles.amountContainer}>
                        <View style={[styles.dot, styles.greenDot]} />
                        <Text style={styles.requestText}>Approved</Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.rupeesIcon}>₹</Text>
                        <Text style={styles.amount}>{item.approvedAmount}</Text>
                    </View>
                </View>
                <View style={styles.requestTextContainer}>
                    <View style={styles.dateContainer}>
                        <FontAwesome5 name="calendar-alt" size={16} color="gray" />
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.detailsContainer}>

                <Text style={styles.descriptionText} numberOfLines={1}>
                    {item.description}
                    {/* Add "More" button logic here */}
                </Text>
                <View style={styles.claimedContainer}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.claimedTitle}>Claimed Amount: </Text>
                        <Text style={styles.rupeesIcon}>₹</Text>
                        <Text style={styles.amount}>{item.claimAmount}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/money.jpg')}>
                <View style={styles.topContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="file-invoice-dollar" size={22} color={'gray'} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.expensesTitle}>Total Expense</Text>
                            <View style={styles.expensesAmountContainer}>
                                <Text style={styles.rupeesIcon}>₹</Text>
                                <Text style={styles.expensesAmount}>5000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.requestsContainer}>
                        <View style={styles.toprequestItem}>
                            <View style={styles.requestTextContainer}>
                                <View style={styles.amountContainer}>
                                    <View style={[styles.dot, styles.orangeDot]} />
                                    <Text style={styles.requestText}>Pending</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                    <Text style={styles.rupeesIcon}>₹</Text>
                                    <Text style={styles.amount}>1000</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.toprequestItem}>
                            <View style={styles.requestTextContainer}>
                                <View style={styles.amountContainer}>
                                    <View style={[styles.dot, styles.greenDot]} />
                                    <Text style={styles.requestText}>Approved</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                    <Text style={styles.rupeesIcon}>₹</Text>
                                    <Text style={styles.amount}>2000</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { navigation.navigate('NewReimbursementRequest')}} style={[styles.button, {
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
                    <Text style={styles.buttonText}>Request New Reimbursement</Text>
                </TouchableOpacity>

            </ImageBackground>



            <View style={styles.bottomContainer}>

                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                        onPress={() => setActiveTab('pending')}
                    >
                        <Text style={[styles.tabText, activeTab === 'pending' && { color: '#aa18ea' }]}>
                            Pending Requests
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                        onPress={() => setActiveTab('history')}
                    >
                        <Text style={[styles.tabText, activeTab === 'history' && { color: '#aa18ea' }]}>
                            History
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* FlatList */}
                <FlatList
                    data={activeTab === 'pending' ? pendingRequests : history}
                    keyExtractor={(item) => item.id}
                    renderItem={activeTab === 'pending' ? renderPendingRequestItem : renderHistoryItem}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        margin: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        overflow: "hidden",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    iconContainer: {
        marginRight: 8,
        // Add styles for the icon container
    },
    textContainer: {
        flexDirection: 'column',
        // flex: 1,
    },
    expensesTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#736f71',
    },
    expensesAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rupeesIcon: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
    },
    expensesAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    requestsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    toprequestItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    orangeDot: {
        backgroundColor: 'orange',
    },
    greenDot: {
        backgroundColor: 'green',
    },
    requestTextContainer: {
        flexDirection: 'column',
    },
    requestText: {
        fontSize: 12,
        color: '#736f71',
        marginRight: 8,
        fontWeight: '600'
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabsContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#ccc',
        borderBottomColor: '#ccc',
        // paddingVertical: 8,
        backgroundColor: '#f7f0fa',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#aa18ea',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#736f71',
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aa18ea',
        marginHorizontal: 16,
        marginBottom: 20
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    requestItem: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    detailsContainer: {
        marginTop: 4,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    dateText: {
        marginLeft: 6,
        color: 'gray',
    },
    descriptionText: {
        fontSize: 14,
        color: 'black',
    },
    approvedContainer: {
        marginTop: 8,
    },
    claimedContainer: {
        marginTop: 8,
    },
    approvedTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
    },
    claimedTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
    },
});

export default Reimbursement;
