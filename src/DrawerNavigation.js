import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './screen/Home';
import CustomDrawer from './component/CustomDrawer';
import AttnHistory from './screen/AttnHistory';
import Leave from './screen/Leave';
import LeaveApproval from './screen/LeaveApproval';
import Reimbursement from './screen/Reimbursement';
import ReimbursementApprove from './screen/ReimbursementApprove';
import EProfile from './screen/EProfile';
import Salaryslip from './screen/Salaryslip';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#aa18ea',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
            }}>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                }}
            />
             <Drawer.Screen
                name="EProfile"
                component={EProfile}
                options={{
                    headerShown: true,
                    drawerIcon: ({ color }) => (
                        <Entypo name="user" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#aa18ea',
                    },
                    title: 'My Profile',
                    headerTintColor: 'white'
                }}
            />
             <Drawer.Screen
                name="AttnHistory"
                component={AttnHistory}
                options={{
                    headerShown: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="calendar-sharp" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#aa18ea',
                    },
                    title: 'Attendance History',
                    headerTintColor: 'white'
                }}
            />
            <Drawer.Screen
                name="Leave"
                component={Leave}
                options={{
                    headerShown: true,
                    drawerIcon: ({ color }) => (
                        <Entypo name="aircraft-take-off" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#aa18ea',
                    },
                    headerTintColor: 'white',
                    title: 'My Leaves',
                }}
            /> 
            <Drawer.Screen
                name="LeaveApproval"
                component={LeaveApproval}
                options={{
                    headerShown: true,
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar-clock-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#aa18ea',
                    },
                    headerTintColor: 'white',
                    title: 'Leave Requests',
                }}
            /> 
            <Drawer.Screen
                name="Reimbursement"
                component={Reimbursement}
                options={{
                    headerShown: true,
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="file-invoice-dollar" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#aa18ea',
                    },
                    headerTintColor: 'white',
                    title: 'Reimbursement',
                }}
            /> 
            <Drawer.Screen
                name="ReimbursementApprove"
                component={ReimbursementApprove}
                options={{
                    headerShown: true,
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="hand-holding-usd" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#aa18ea',
                    },
                    headerTintColor: 'white',
                    title: 'Approve Reimbursement',
                }}
            /> 
            <Drawer.Screen
                name="Salaryslip"
                component={Salaryslip}
                options={{
                    headerShown: true,
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="file-document-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#aa18ea',
                    },
                    headerTintColor: 'white',
                    title: 'My Salary Slip',
                }}
            /> 
        </Drawer.Navigator>
    )
}

export default DrawerNavigation