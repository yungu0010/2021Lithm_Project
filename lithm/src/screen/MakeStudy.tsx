import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Text,TextInput, View, TouchableOpacity,Platform } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from 'react-native-select-dropdown'
// import { widthNavigation } from 'react-navigation';
import styles from '../styles/styles';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

const MakeStudy = ({navigation} : {navigation:any}) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [solve, setSolve] = useState(3);
    const [day, setDay] = useState('Sunday');
    const [penalty, setPenalty] = useState(1000);


    // const onMakeStudy = () => {
    //     fetch(`${API_URL}/Calendar`, { //GET /경로 HTTP/1.1 Host:ApiServer(우리주소) Authorization:Bearer jwttoken 을 제출하는 oAuth방식
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then(async res => { //res를 가져옴
    //         try {
    //             const jsonRes = await res.json();   //headers, url, bodyUsed 등을 message 타입으로 변경   
    //             if (res.status === 200) {  
    //                 setMessage(jsonRes.message);
    //                 navigation.navigate('Calendar'); //스터디가 없으면 이동
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         };
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

    const onSubmitHandler = () => {
        const payload = {
            title,
            solve,
            day,
            penalty
        };
        fetch(`${API_URL}/makestudy`, {
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
                    //onMakeStudy();
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

    const date = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity style={{width: scaleWidth(66) onPress={() => this.props.navigation.toggleDrawer()}}}>메뉴 아이콘 자리</TouchableOpacity> */}
            <Text style={styles.heading}>Create a New Study</Text>
            <View style={styles.card}>
                
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle}/>
                        
                        <View style={{flexDirection: 'row' ,margin: '5%'}}>
                        <Text>Rules</Text>
                        <Text>Solve </Text><NumericInput rounded value={solve} onChange={setSolve} /><Text> problems a week</Text>
                        </View>

                        <View  style={{flexDirection: 'row' ,margin: '5%'}}>
                        <Text>Deadline    every </Text>
                        <SelectDropdown
                        	data={date}
                        	onSelect={(selectedItem, index) => setDay(selectedItem)}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                        </View>

                        <View style={{flexDirection: 'row' ,margin: '5%'}}>
                        <Text>Penalty    </Text><TextInput style={styles.input} placeholder="1000" onChangeText={(value)=>{const newvalue=parseInt(value);setPenalty(newvalue)}} keyboardType="numeric"/><Text> won</Text>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                    </View>    
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MakeStudy;