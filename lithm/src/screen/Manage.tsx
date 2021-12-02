import React, {useState,useLayoutEffect,useMemo} from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity,TextInput, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../styles/styles';
import {TopBar} from '../navigate/TopBar';

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
                    setMember(members);
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
                    Alert.alert("Error",jsonRes.message);
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
    <SafeAreaView style={styles.container1}>
        <TopBar></TopBar>
        <Text style={[Managestyle.title,{padding:10,paddingBottom:0}]}>{studyName}</Text>
        <View style={{justifyContent:'center',marginLeft:20,marginRight:20,padding:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginBottom:0}}>
                <View style={{flexDirection:'row'}}><Icon name="account-group" color="black" size={30}/>
                    <Text style={{color:'black',fontSize:23,fontWeight:'500'}}>Mate</Text>
                </View>
                <View style={{flexDirection:'column',padding:0}}>
                    <TouchableOpacity onPress={()=>setPress(1)}>
                        <Icon name="account-plus" color="black" size={30}/>
                    </TouchableOpacity>
                    {press?
                    <View style={{flexDirection:'row', justifyContent:'space-around',top:-20}}>
                        <TextInput placeholder='User Email' autoFocus={true} onChangeText={setEmail} style={{fontSize:18}}/>
                        <TouchableOpacity onPress={addMember} style={{padding:20}}><Icon name="check-circle-outline" color="#0078FF" size={26}/></TouchableOpacity>
                    </View>
                    :<View></View>}
                </View>
            </View>
            <View style={{flexDirection:'row',top:20,marginBottom:20}}>
            {member.map((mem, idx)=>
                <View key={idx} style={{paddingLeft:10,paddingRight:10, margin:5}}>
                    <View style={{padding:'1%', left:5,width:30,height:30,borderRadius:15,backgroundColor:mem['user_color']}}/>
                    <Text style={{fontSize:16,color:'black',textAlign:'center'}}>{mem['user_nick']}</Text>
                </View>)}
            </View>
        <View style={{backgroundColor:'white',marginTop:20,borderTopColor:'grey',borderTopWidth:1}}>
            <View style={[{justifyContent:'space-between',flexDirection:'row'}]}>         
                <View><Text style={[MakeStudystyle.text,{paddingTop:20}]}>Rules</Text></View>
                <View style={{paddingTop:20}}><TouchableOpacity onPress={()=>setUpdatePress(1)}><Icon name="pencil" color="black" size={24}/></TouchableOpacity></View>
            </View>
            {!updatePress?
            <View style={{margin:'5%',paddingLeft:'5%',paddingRight:'5%'}}>
                <View style={{flexDirection: 'row' ,margin: '5%'}}><Text style={[Managestyle.text,{left:-20}]}>Solve     {studySolve}   problems a week</Text></View>
                <View style={{flexDirection: 'row' ,margin: '5%'}}><Text style={[Managestyle.text,{left:-20}]}>Deadline      every     {studyDay}</Text></View>
                <View style={{flexDirection: 'row' ,margin: '5%'}}><Text style={[Managestyle.text,{left:-20}]}>Penalty      {studyPenalty}  ￦</Text></View>
            </View>
            :<View style={{margin:'5%',paddingLeft:'5%',paddingRight:'5%'}}>
                <View style={{flexDirection: 'row' ,margin: '5%'}}><Text style={[Managestyle.text,{left:-20}]}>Solve </Text><NumericInput rounded value={studySolve} onChange={setStudysolve} textColor='#0078FF'
                minValue={1}
                maxValue={7}
                iconSize={10}
                totalWidth={50}
                totalHeight={40}
                type='up-down'/><Text style={Managestyle.text}>  problems a week</Text></View>
                <View style={{flexDirection: 'row' ,margin: '5%'}}>
                <Text style={[Managestyle.text,{left:-20}]}>Deadline    every</Text>
                <SelectDropdown
                    defaultButtonText={studyDay}
                    buttonStyle={{
                        height:40, 
                        width:130,
                        padding:0,
                        bottom:10,
                        borderRadius:3,
                        backgroundColor:'whitesmoke'}}
                    data={date}
                    onSelect={(selectedItem, index) => setStudyday(selectedItem)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {return item}}
                /></View>
                <View style={{flexDirection: 'row' ,margin: '5%'}}>
                <Text style={[Managestyle.text,{left:-20}]}>Penalty    </Text><TextInput style={{color:'#0078FF',bottom:10}} value={String(studyPenalty)} onChangeText={(value)=>{const newvalue=parseInt(value);setStudypenalty(newvalue)}} keyboardType="numeric"/><Text style={Managestyle.text}> ￦</Text>
                </View>
                <TouchableOpacity style={[styles.button,{left:20}]} onPress={updateRule}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>}
        </View></View>
        </SafeAreaView>
    );
};

export default Manage;

const Managestyle = StyleSheet.create({
    title: {
      textAlign:'left',
      left:20,
      fontSize:26,
      color:'black',
    },
    text:{
      fontSize:16,
      color:'black',
      textAlign:'center',
      fontWeight:'500',
    }
});
const MakeStudystyle = StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:'500',
        color:'black'
    }
   });