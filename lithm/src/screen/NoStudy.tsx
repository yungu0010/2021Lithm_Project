import React,{ useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Button, Platform, TouchableOpacity} from "react-native";
import styles from '../styles/styles';
const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

// Button 터치하면 MakeStudy 스크린으로 이동할 수 있도록 한다.
const NoStudy = ({navigation} : {navigation:any}) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const onLogout = () => {
        fetch(`${API_URL}/logout`, { //GET /경로 HTTP/1.1 Host:ApiServer(우리주소) Authorization:Bearer jwttoken 을 제출하는 oAuth방식
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(async res => { //res를 가져옴
            try {
                const jsonRes = await res.json();   //headers, url, bodyUsed 등을 message 타입으로 변경   
                console.log(jsonRes);
                if (res.status === 200) {  //Auth.js 에서 넘겨준 status
                    setMessage(jsonRes.message);
                    navigation.navigate('AuthScreen'); //스터디가 없으면 이동
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
            <Text>스터디 초대를 기다리는 중입니다...</Text>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('MakeStudy')}>
                <Text style={styles.buttonText}>Go to MakeStudy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
        </View>
        </SafeAreaView>
    );
}

export default NoStudy;