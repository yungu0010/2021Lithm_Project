import React from 'react';
import {createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './AuthScreen';
import NoStudy from './NoStudy';
import MakeStudy from './MakeStudy';
import CalendarView from './Calendar';

const Stack = createStackNavigator();
const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="AuthScreen" component={AuthScreen}/>
            <Stack.Screen name="NoStudy" component={NoStudy}/>
            <Stack.Screen name="MakeStudy" component={MakeStudy}/>
            <Stack.Screen name="CalendarView"  component={CalendarView}/>
        </Stack.Navigator>
    );
}

export default StackNavigator;