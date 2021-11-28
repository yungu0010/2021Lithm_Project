import React,{ useState } from "react";
import { SafeAreaView, Text, View, Platform, TouchableOpacity} from "react-native";
import styles from '../styles/styles';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

// Button 터치하면 MakeStudy 스크린으로 이동할 수 있도록 한다.
const NoStudy = ({navigation} : {navigation:any}) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const onLogout = () => {
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
                    setMessage(jsonRes.message);
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

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={[styles.card, {flex: 1}]}>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
            <Text style={styles.nostudy}>스터디를 만들어 팀원을 초대하거나</Text>
            <Text style={[styles.nostudy, {marginBottom:'10%', textAlign: 'center'}]}>초대를 기다리세요</Text>
            <TouchableOpacity style={[styles.button, {marginBottom: 10}]} onPress={()=> navigation.navigate('MakeStudy')}>
                <Text style={styles.buttonText}><Material name="file-document" size={24}></Material> MakeStudy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
                <Text style={styles.buttonText}><Material name="logout" size={24} color='white'></Material> Logout</Text>
            </TouchableOpacity>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
        </View>
        </View>
        </SafeAreaView>
    );
}

export default NoStudy;