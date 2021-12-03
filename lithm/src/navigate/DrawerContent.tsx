import React, {useCallback, useState} from "react";
import {StyleSheet, TouchableOpacity, Platform, Text, View} from 'react-native';
import type {FC} from 'react';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import type {AppState} from "../store";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store";


const title = "DrawerContent";

//const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
const API_URL = 'http://3.36.52.76'; //배포 baseURL

const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const dispatch=useDispatch();

    const navigation = useNavigation();
    const loggedIn = useSelector<AppState, boolean>((state)=>state.loggedIn);
    const userEmail = useSelector<AppState, string>((state)=>state.email); //로그인한 사용자 이메일
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
    if(loggedIn){//로그인한 상태
        return(
        <DrawerContentScrollView {...props} contentContainerStyle = {styles.safe}>
            <View style={[styles.content]}>
                <TouchableOpacity onPress={goHome}><Text style={[styles.text]}>Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={goProfile}><Text style={[styles.text]}>Profile</Text></TouchableOpacity>
                <TouchableOpacity onPress={goManage}><Text style={[styles.text]}>Manage</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{Logout();dispatch(logoutAction());}}><Text style={[styles.text]}>Logout</Text></TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
    }else{//로그인 안 한 상태
        return(
            <DrawerContentScrollView {...props} contentContainerStyle = {styles.safe}>
                <View style={[styles.content]}>
                    <Text style={[styles.text]}>Please Log In</Text>
                </View>
            </DrawerContentScrollView>
    )
    }
}
export default DrawerContent;

const styles = StyleSheet.create({
    safe: {flex:0.5},
    text: {fontSize: 20,padding:10},
    content: {flex:1, alignItems: 'flex-end', jutifyContent: 'center',marginEnd:20,padding:20},

})