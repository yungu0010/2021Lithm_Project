import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet,SafeAreaView, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import NoStudy from './NoStudy';
import MakeStudy from './MakeStudy';
import CalendarView from './Calendar';
import styles from '../styles/styles';


const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

const AuthScreen = ({navigation} : {navigation:any}) => {
    const [email, setEmail] = useState('');
    const [name, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [bjid, setBjId] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };
    const hasStudy=()=>{
        fetch(`${API_URL}/hasstudy`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }).then(async res=>{
            try{
                const has=await res.json();
                if(has.message=='nostudy'){ navigation.navigate('NoStudy')}
                else{ navigation.navigate('CalendarView') }
            }
            catch(err) { console.log(err); };
        }).catch(err => {
            console.log(err);
        });
    };
    const onLoggedIn = (token: any) => {
        fetch(`${API_URL}/private`, { //GET /경로 HTTP/1.1 Host:ApiServer(우리주소) Authorization:Bearer jwttoken 을 제출하는 oAuth방식
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { //res를 가져옴
            try {
                const jsonRes = await res.json();   //headers, url, bodyUsed 등을 message 타입으로 변경   
                if (res.status === 200) {  //Auth.js 에서 넘겨준 status
                    setMessage(jsonRes.message);
                    hasStudy();
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
            bjid
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

  ;

    return(
    <View style={styles.card}>
        <Text style={styles.heading1}>{isLogin ? 'Log into \nYour account' : 'Signup'}</Text>
        <View style={styles.form}>
            <View style={styles.inputs}>
                <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setNick}></TextInput>}
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                {!isLogin && <TextInput style={styles.input} placeholder="Bj ID" onChangeText={setBjId}></TextInput>}
                <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                    <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                </TouchableOpacity>
            </View>    
        </View>
    </View>
    );
};


export default AuthScreen;