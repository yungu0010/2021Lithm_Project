import React, {useState,useLayoutEffect} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity,Platform, TextInput} from 'react-native';
import { Title,  Text} from 'react-native-paper';
import {TopBar} from './TopBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

let u,s,c,p;
const Profile = ({navigation} : {navigation:any}) => {
  const [nick,setNick]=useState('');
  const [input,setInput]=useState(0);
  const [color,setColor]=useState('');
  const [title,setTitle]=useState('');
  const [email,setEmail]=useState('');
  const [solve,setStudySolve]=useState('');
  const [count,setCount]=useState(0);
  const [penalty,setPenalty]=useState(0);
  const [success,setSuccess]=useState([]);
  const [fail,setFail]=useState([]);
  const getProfile = () => {
    fetch(`${API_URL}/profile`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
        },
    })
    .then(async res => { //res를 가져옴
        try {
            const jsonRes = await res.json();
            if (res.status === 200) {  
                const {user,study,count,problems}=jsonRes;
                return {user,study,count,problems}
            }
        } catch (err) {
            console.log(err);
        };
    })
    .then((element)=>{
        u=element?.user; s=element?.study; c=element?.count; p=element?.problems;
        setNick(u['user_nick']);setColor(u['user_color']);setTitle(s['study_title']);setEmail(u['user_email']);setCount(c);setPenalty(u['user_penalty']);setSuccess(p['success']);setFail(p['fail']);setStudySolve(s['study_solve']);
    })
    .catch(err => {
        console.log(err);
    });
  }
  const editNick = () => {
      const payload = {
        nick
    };
    fetch(`${API_URL}/profile`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
    })
    .then(async res => { //res를 가져옴
        try {
            const jsonRes = await res.json();
            if (res.status === 200) { 
                const {nick}=jsonRes; //나,스터디,인원,푼 문제들
                setNick(nick)
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
  }
  const resignStudy = () => {
    fetch(`${API_URL}/study/resign`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
        },
    })
    .then(async res => { //res를 가져옴
        try {
            await res.json();
            if (res.status === 200) { //성공적 탈퇴
                navigation.navigate('NoStudy')
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
 }
 useLayoutEffect(() => {
    getProfile();
  },[]);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{backgroundColor:color}}></View>
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
              color:'black'
            }]}>{title}</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/><Text>{email}</Text>
          {!input?<View><TouchableOpacity onPress={()=>setInput(1)}><Text style={{color:"black"}}>{nick}</Text></TouchableOpacity></View>
          :<View><TextInput onChangeText={setNick} autoFocus={true}></TextInput>
          <TouchableOpacity onPress={()=>{editNick();setInput(0)}}><Text>닉네임 수정</Text></TouchableOpacity></View>}
        </View>
      </View>

      <View>
          <View style={{flexDirection: 'row'}}>
            <Text>{title}</Text>
            <Text><Icon name="account-group" size={20}></Icon>{count}</Text>
            <TouchableOpacity onPress={resignStudy}><Text>Resign</Text></TouchableOpacity>
          </View>
            <View style={{flexDirection: 'row'}}>
            <Text>Penalty</Text>
            <Text>{penalty}</Text>
            </View>
              <Text>Progress</Text>
              <Text>{`${solve}개 중 1개`}</Text>
      </View>
      <View style={styles.menuWrapper}>
          <View style={styles.problems}>
            <Text style={styles.problemText}>{success.map((s,idx)=><Text key={idx}>{s+"      "}</Text>)}</Text>
          </View>
          <View style={styles.problems}>
            <Text style={styles.problemText}>{fail.map((f,idx)=><Text key={idx}>{f+"      "}</Text>)}</Text>
          </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  problems: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  problemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  card: {
      width: '90%',
      height: '30%',
      justifyContent: 'center',
      backgroundColor: '#c9e6ee',
      marginLeft: 20,
      marginTop: 10,
      padding: '2%',
      borderRadius: 15,
  },
});