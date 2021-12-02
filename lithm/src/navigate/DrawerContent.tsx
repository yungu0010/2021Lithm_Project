import React, {useCallback} from "react";
import {StyleSheet, View, Text, TouchableOpacity, Switch, Platform} from 'react-native';
import type {FC} from 'react';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {useToggleContext} from '../theme/ToggleThemeContext';

const title = "DrawerContent";

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const theme = useTheme();
    const {colors} = theme;
    const toggleTheme = useToggleContext();
    const navigation = useNavigation();
    const goProfile = useCallback(()=>{
        navigation.navigate('Profile');
    },[]);
    const goManage = useCallback(()=>{
        navigation.navigate('Manage');
    },[]);
    const goHome = useCallback(()=>{
        navigation.navigate('CalendarView');
    },[]);
    const Logout = () => {
        fetch(`${API_URL}/logout`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();   
                console.log(jsonRes);
                if (res.status === 200) {
                    navigation.navigate('AuthScreen');
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }
    return(
        <DrawerContentScrollView {...props} contentContainerStyle = {styles.safe}>
            <View style={[styles.content,{backgroundColor: colors.background}]}>
                <TouchableOpacity onPress={goHome}><Text style={[styles.text,{color: colors.text}]}>Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={goProfile}><Text style={[styles.text,{color: colors.text}]}>Profile</Text></TouchableOpacity>
                <TouchableOpacity onPress={goManage}><Text style={[styles.text,{color: colors.text}]}>Manage</Text></TouchableOpacity>
                <TouchableOpacity onPress={Logout}><Text style={[styles.text,{color: colors.text}]}>Logout</Text></TouchableOpacity>
                <View style={{padding:20}}><Switch trackColor={{ false: "whitesmoke", true: "#93cddd" }} thumbColor={"#0078FF"} value={theme.dark} onValueChange={toggleTheme} /></View>
            </View>

        </DrawerContentScrollView>
    )
}
export default DrawerContent;

const styles = StyleSheet.create({
    safe: {flex:0.5},
    text: {fontSize: 20,padding:10},
    content: {flex:1, alignItems: 'flex-end', jutifyContent: 'center',marginEnd:20,padding:20},

})