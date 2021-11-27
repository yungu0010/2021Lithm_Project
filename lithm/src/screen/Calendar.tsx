import React, { useState ,useMemo, useEffect, useRef} from 'react';
import { ImageBackground, View, Text, StyleSheet,TouchableOpacity, TextInput, Platform, SafeAreaView } from 'react-native';
import styles from '../styles/styles';
import {Agenda} from 'react-native-calendars';
import { TopBar } from './TopBar';
import {Colors} from 'react-native-paper';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

type Item = {
  userName: string;
  success: string;
  fail: string;
  color: string;
}

const CalendarView = ({navigation} : {navigation:any}) => {
    //내가 푼 문제들만 calendar에 나타내면 성공
    //내 색깔을 calendar에 표시해야하고, calendar 밑 view에는 내가 푼 문제들 번호 나타내기turn status + message;
    ///const [study_ti,ㅎㅁㅅ]=use
    const [studyName, setStudyname] = useState('');   //스터디명
    const [studySolve, setStudysolve] = useState(''); //스터디 문제풀이 규칙
    const [studyDay, setStudyday] = useState('');     //스터디 리셋 날짜
    const [userName, setUsername] = useState('');     //유저이름
    const [userPenalty, setUserpenalty] = useState(''); //유저벌금

    //agenda에서 사용
    const [items, setItems] = useState<{[key: string]: Item[]}>({
      '2021-11-29': [{userName: 'young', success: '2110', fail: '', color: '#a4c0b4'}, {userName: 'yungu', success: '', fail:'1020', color: '#e78f29'}],
      '2021-11-30': [{userName: 'yungu', success: '', fail:'', color: '#e78f29'}],
    })

    const renderItem = (item: Item) => {
      const CircleW = 20
      const CircleH = 20
      let Color = item.color
      // if (item.userName == 'yungu'){
      //   Color = item.color
      // }
      // else if (item.userName == 'young'){
      //   Color = item.color
      // }
      return(
        <View style={{backgroundColor: 'lightgrey', borderRadius: 10}}>
          <Text>{item.userName}</Text>
          <Text>success: {item.success}</Text>
          <Text>fail: {item.fail}</Text>
          <View style={{width: CircleW, height: CircleH, borderRadius: CircleW/2, backgroundColor: Color}}><Text>J</Text></View>
        </View>
      )
    }
    
    const getStudyInfo = () => {
      fetch(`${API_URL}/study/info`, { //GET /경로 HTTP/1.1 Host:ApiServer(우리주소) Authorization:Bearer jwttoken 을 제출하는 oAuth방식
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
        },
      })
      .then(async res => { //res를 가져옴
        try {
            const jsonRes = await res.json();
            if (res.status === 200) {
                const {study,user}=jsonRes; //members 가져올 수 있음
                setStudysolve(study['study_solve']);
                setStudyname(study['study_title']);
                setStudyday(study['study_day']);
                setUsername(user['user_nick']);
                setUserpenalty(user['user_penalty']);               
            } 
        } catch (err) {
            console.log(err);
        };
      })
      .catch(err => {
          console.log(err);
      });
    }

    useEffect(()=>getStudyInfo(),[])

    return (
      <SafeAreaView style={{flex:1}}>
        <TopBar></TopBar>
        <View>
        <View><Text style={{fontWeight:'bold',fontSize:40,textAlign:'center'}}>{studyName}</Text></View>
        <View><Text style={{color:Colors.grey200,fontSize:10,textAlign:'center'}}>{studySolve} problems a week, on {studyDay}</Text></View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>{userName}</Text>
        <Text style={{color:Colors.grey200,fontSize:10,textAlign:'center'}}>{userPenalty}</Text>
        </View>
        </View>
        <Agenda
          selected={'2021-11-25'}
          items={items}
          renderItem = {renderItem}
          theme={{
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue'
          }}
        />
      </SafeAreaView>
    );
}

export default CalendarView;

const styleCalendar = StyleSheet.create({
    text: {
      textAlign: 'center',
      padding: 10,
      backgroundColor: 'lightgrey',
      fontSize: 16
    },
  });