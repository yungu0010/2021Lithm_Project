import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Appearance, useColorScheme } from 'react-native-appearance';

import Profile from './Profile';
import Manage from './Manage';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name ="Profile" component = {Profile}/>
            <Drawer.Screen name ="Manage" component = {Manage}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;