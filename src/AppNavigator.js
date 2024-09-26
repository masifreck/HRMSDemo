import React from 'react'
// import Onboarding from './screen/Onboarding';
import Home from './screen/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';
import DrawerNavigation from './DrawerNavigation';
import Punch from './screen/Punch';
import NewLeave from './screen/NewLeave';
import LeaveSts from './screen/LeaveSts';
import NewReimbursementRequest from './screen/NewReimbursementRequest';
import NewExpense from './screen/NewExpense';
import ReimbursementSts from './screen/ReimbursementSts';
import NewSplash from '../screen/Splash';
import Newlogin from './screen/Newlogin';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{ headerShown: false }}
                /> */}
           
                
<Stack.Screen 
name='splash' component={NewSplash} 
options={{headerShown:false}}/>

<Stack.Screen name='newlogin' component={Newlogin}/>

   <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }} />

<Stack.Screen
                    name='DrawerNavigation'
                    component={DrawerNavigation}
                    options={{ headerShown: false }} />

                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ headerShown: false }} />
                   
                 
                
                <Stack.Screen
                    name='Punch'
                    component={Punch}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#aa18ea',
                        },
                        title: 'Punch Attendance',
                        headerTintColor: 'white'
                    }} />
                <Stack.Screen
                    name='NewLeave'
                    component={NewLeave}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#aa18ea',
                        },
                        title: 'Request New Leave',
                        headerTintColor: 'white'
                    }} />
                <Stack.Screen
                    name='LeaveSts'
                    component={LeaveSts}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#aa18ea',
                        },
                        title: 'Leave Status',
                        headerTintColor: 'white'
                    }} />
                <Stack.Screen
                    name='NewReimbursementRequest'
                    component={NewReimbursementRequest}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#aa18ea',
                        },
                        title: 'New Reimbursement Request',
                        headerTintColor: 'white'
                    }} />
                <Stack.Screen
                    name='NewExpense'
                    component={NewExpense}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#aa18ea',
                        },
                        title: 'Add New Expense',
                        headerTintColor: 'white'
                    }} />
                <Stack.Screen
                    name='ReimbursementSts'
                    component={ReimbursementSts}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#aa18ea',
                        },
                        title: 'Reimbursement Status',
                        headerTintColor: 'white'
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigator