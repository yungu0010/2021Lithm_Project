import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text} from 'react-native';
import Profile from './Profile';
import Manage from './Manage';
import AuthScreen from './AuthScreen';
import StackNavigator from './Stack';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent = {(props) => <DrawerContent {...props}/>}>
             <Drawer.Screen name ="Home" component = {StackNavigator}/>
             <Drawer.Screen name ="Profile" component = {Profile}/>
             <Drawer.Screen name ="Manage" component = {Manage}/>
             <Drawer.Screen name="Logout" component={AuthScreen}/>     
         </Drawer.Navigator>
    );
}

export default DrawerNavigator;