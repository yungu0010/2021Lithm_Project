import React, {useState,useMemo} from "react";
import { SafeAreaView, StyleSheet, Text,TextInput, View, TouchableOpacity,Platform, KeyboardAvoidingView, Alert } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from 'react-native-select-dropdown';
import {TopBar} from '../navigate/TopBar';
import styles from '../styles/styles';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

const MakeStudy = ({navigation} : {navigation:any}) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [solve, setSolve] = useState(3);
    const [day, setDay] = useState('Sunday');
    const [penalty, setPenalty] = useState(1000);

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
                    Alert.alert("Error","Study Title Error!")
                } else {
                    setIsError(false);
                    setMessage(jsonRes.message);
                    navigation.navigate('CalendarView');
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

    const date = useMemo(()=>["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],[])

    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <SafeAreaView style={styles.container1}>
            <TopBar></TopBar>
            <View><Text style={[styles.heading,{marginTop:10, top:10}]}>Create a New</Text>
            <Text style={[styles.heading,{top:10}]}>Study</Text>
            </View>
            <View style={styles.card1}>
                <View style={styles.form1}>
                    <View style={styles.inputs1}> 
                        <View style={styles.title}><Text style={MakeStudystyle.text}>Title</Text></View>
                        <TextInput style={styles.input1} placeholder="Title" value={title} onChangeText={setTitle}/>
                        
                        <View style={styles.title}><Text style={MakeStudystyle.text}>Rules</Text></View>
                        <View style={{left:10,margin:'5%',paddingLeft:'5%',paddingRight:'5%'}}>
                        <View style={{flexDirection: 'row' ,margin: '5%'}}>
                        <Text style={styles.leftText}>Solve  </Text><NumericInput rounded value={solve} onChange={setSolve}
                        textColor='#0078FF'
                        minValue={1}
                        maxValue={7}
                        iconSize={10}
                        totalWidth={50}
                        totalHeight={40}
                        type='up-down'
                        /><Text style={styles.leftText}>  problems a week</Text>
                        </View>

                        <View  style={{flexDirection: 'row' ,margin: '5%'}}>
                        <Text style={styles.leftText}>Deadline    every  </Text>
                        <SelectDropdown
                            defaultButtonText={'Sunday'}
                            buttonStyle={{height:40, width:130,        padding:0,
                            bottom:10,
                            borderRadius:3,
                            backgroundColor:'whitesmoke'}}
                        	data={date}
                        	onSelect={(selectedItem, index) => setDay(selectedItem)}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                        </View>

                        <View style={{flexDirection: 'row' ,margin: '5%'}}>
                        <Text style={styles.leftText}>Penalty    </Text><TextInput style={[styles.inputBorder,{width:80}]} placeholder="1000" onChangeText={(value)=>{const newvalue=parseInt(value);setPenalty(newvalue)}} keyboardType="numeric"/><Text style={styles.leftText}> ￦</Text>
                        </View>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        </View>
                        <TouchableOpacity style={styles.button1} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText1}>Submit</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
    );
}
const MakeStudystyle = StyleSheet.create({
   text:{
       fontSize:20,
       fontWeight:'500'
   }
  });

export default MakeStudy;