import React,{ useState, useRef, useEffect } from "react";
import { SafeAreaView, Text, View, Platform, TouchableOpacity, Animated} from "react-native";
import styles from '../styles/styles';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const API_URL = 'http://3.36.52.76'; //배포 baseURL 


const FadeInView = ({children}:{children:any}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {   useNativeDriver: true,
                toValue:1,
                duration: 1500,
            }
        ).start();
    },[fadeAnim])

    return (
        <Animated.View style={[styles.button, {marginBottom: 10, opacity: fadeAnim}]}>
            {children}
        </Animated.View>
    )
}

const NoStudy = ({navigation} : {navigation:any}) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const animValue = useRef(new Animated.Value(0)).current;
    const animStyle = {opacity: animValue};
    Animated.timing(
        animValue, 
        {
            useNativeDriver: true, 
            toValue: 1,
            duration: 2000,
    }).start();

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

            <FadeInView>
            <TouchableOpacity onPress={()=> navigation.navigate('MakeStudy')}>
                <Text style={styles.buttonText}><Material name="file-document" size={24}></Material> MakeStudy</Text>
            </TouchableOpacity>
            </FadeInView>
            <FadeInView>
            <TouchableOpacity onPress={onLogout}>
                <Text style={styles.buttonText}><Material name="logout" size={24} color='white'></Material> Logout</Text>
            </TouchableOpacity>
            </FadeInView>

            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
        </View>
        </View>
        </SafeAreaView>
    );
}

export default NoStudy;