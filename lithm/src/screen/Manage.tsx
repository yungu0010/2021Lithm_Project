import React, {useState,useLayoutEffect,useMemo} from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity,TextInput, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../styles/styles';
import {TopBar} from './TopBar';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

const Manage = ({navigation} : {navigation:any}) => {
    const [member,setMember]=useState([]);
    const [studyName, setStudyname] = useState('');
    const [studySolve, setStudysolve] = useState(0);
    const [studyDay, setStudyday] = useState('');
    const [studyPenalty, setStudypenalty] = useState(0);
    const [email, setEmail] = useState('');
    const [press, setPress] = useState(0);
    const [updatePress, setUpdatePress] = useState(0);
    const date = useMemo(()=>["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],[])
    const getStudyInfo = () => {
        fetch(`${API_URL}/study/info`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(async res => { //res를 가져옴
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    const {study,members}=jsonRes;
                    setStudysolve(study['study_solve']);
                    setStudyname(study['study_title']);
                    setStudyday(study['study_day']);
                    setStudypenalty(study['study_penalty']);
                    setMember(members)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
      }
      useLayoutEffect(() => { getStudyInfo();},[]);

    const addMember = () => {
        const payload = {
            email
        };
        fetch(`${API_URL}/study/addmember`, {
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
                    console.log(jsonRes.message)
                } else { //성공적으로 멤버 추가
                    console.log(jsonRes.message)
                    getStudyInfo();
                    setPress(0)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };
    const updateRule = () => {
        const payload = {
            studySolve,studyDay,studyPenalty
        };
        fetch(`${API_URL}/study/update`, {
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
                    console.log(jsonRes.message)
                } else { //성공적으로 규칙 수정
                    console.log(jsonRes.message)
                    getStudyInfo();
                    setUpdatePress(0)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    return (
        <SafeAreaView>
            <TopBar></TopBar>
            <Text>{studyName}</Text>
            <View style={{flexDirection:'row'}}>
                <Icon name="account-group" color="#777777" size={20}/>
                <Text>Mate</Text>
                {member.map((mem, idx)=><View key={idx}><Text>{mem['user_nick']}</Text></View>)}
            </View>
            <View>
                <TouchableOpacity onPress={()=>setPress(1)}>
                    <Icon name="clipboard-plus" color="black" size={20}/>
                </TouchableOpacity>
            </View>
            {press?<View>
                <TextInput placeholder='User Email' autoFocus={true} onChangeText={setEmail}></TextInput>
                <TouchableOpacity onPress={addMember}><Text>AddUser</Text></TouchableOpacity>
                </View>
            :<View></View>}

            <View><TouchableOpacity onPress={()=>setUpdatePress(1)}><Text>Update Rules</Text></TouchableOpacity></View>
            <View><Text>Rules</Text></View>
            {!updatePress?
            <View>
                <Text>Solve       {studySolve} problems a week</Text>
                <Text>Deadline        every {studyDay}</Text>
                <Text>Penalty      {studyPenalty}</Text>
            </View>
            :<View>
                <View><Text>Solve </Text><NumericInput rounded value={studySolve} onChange={setStudysolve} /><Text> problems a week</Text></View>
                <View  style={{flexDirection: 'row' ,margin: '5%'}}>
                <Text>Deadline    every </Text>
                <SelectDropdown
                    data={date}
                    onSelect={(selectedItem, index) => setStudyday(selectedItem)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {return item}}
                /></View>
                <View style={{flexDirection: 'row' ,margin: '5%'}}>
                <Text>Penalty    </Text><TextInput style={styles.input} value={String(studyPenalty)} onChangeText={(value)=>{const newvalue=parseInt(value);setStudypenalty(newvalue)}} keyboardType="numeric"/><Text> won</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={updateRule}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>}
            
        </SafeAreaView>
    );
};

export default Manage;