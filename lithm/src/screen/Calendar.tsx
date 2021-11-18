import React, { useState ,useMemo, useEffect, useRef} from 'react';
import { ImageBackground, View, Text, StyleSheet,TouchableOpacity, TextInput, Platform, SafeAreaView } from 'react-native';
import styles from '../styles/styles';
import {Agenda, Calendar} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

const CalendarView = ({navigation} : {navigation:any}) => {
    //내가 푼 문제들만 calendar에 나타내면 성공
    //내 색깔을 calendar에 표시해야하고, calendar 밑 view에는 내가 푼 문제들 번호 나타내기turn status + message;
    ///const [study_ti,ㅎㅁㅅ]=use
    const [studyName, setStudyname] = useState('');   //스터디명
    const [studySolve, setStudysolve] = useState(''); //스터디 문제풀이 규칙
    const [studyDay, setStudyday] = useState('');     //스터디 리셋 날짜
    const [userName, setUsername] = useState('');     //유저이름
    const [userPenalty, setUserpenalty] = useState(''); //유저벌금
    const [bjId, setBjid] = useState('');             //유저 백준 아이디
    const [proDate, setProdate] = useState([]);       //문제 풀이 한 날
    const [userInfo, setUserinfo] = useState([]);     //유저 정보
    const [success, setSuccess] = useState([]);       //유저가 푼 문제

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
                  const {study,user,result}=jsonRes; //members 가져올 수 있음
        //[{'bj_id':'tlszn121','user_color':'#777777','user_nick':'아아','success':[[Array],[Array]],'fail':[['11047','2011-11-12T10:01:44.00Z']]}],  ['succes'][0]:문제번호, ['fail'][1]:시간
                  console.log(result)
                  setStudysolve(study['study_solve']);
                  setStudyname(study['study_title']);
                  setStudyday(study['study_day']);
                  setUsername(user['user_nick']);
                  setUserpenalty(user['user_penalty']);
                  setBjid(user['bj_id']);
                  console.log("유저인포" + userInfo)
                  for(let i in userInfo){
                    console.log(i)
                  }
                  for(let i=0; i<result.length; i++){
                    setUserinfo(result[i]);
                    for (let j in userInfo){
                      console.log("j??" + userInfo[j]);
                    }
                    if(result[i]['bj_id'] == bjId){
                      setProdate(result[i]['success']);
                      break;
                    }
                  } 
                  [0,1].map((index)=>{result[index]['user_nick']})
                  } 
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    }

    const Display = () => {
      // for (let i in userInfo){
      //   setArray.push(<View>{userInfo[i]}</View>)
      // }
      // return array;
      // userInfo.map((element: any[])=><Text>{element+"      "}</Text>)
      //이 함수 실행됐을 때 달력 아래 View로 유저마다 푼 정보 보여줄 수 있도록 만들기
    }
    useEffect(()=>getStudyInfo(),[])

      return (
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}><Text>뒤로 가기</Text></TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Text>{userName}</Text>
          <Text>{userPenalty}</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
            <Text>Profile</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> navigation.navigate('Manage')}>
            <Text>Manage</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> navigation.navigate('Manage')}>
            <Text>개빡침</Text>
          </TouchableOpacity> 

          <Calendar style={styleCalendar.calendar} 
            enableSwipeMonths
            onDayPress={()=>(console.log())}
            >
          </Calendar>
          <Text>{proDate}</Text>
          <Text>{userInfo}</Text>
          {/*[0,1,2].map((index)=>{<View><Text style={{color : 'black'}}>{userInfo[index]['user_nick']}</Text></View>})*/}
          {/* <Text>결과{result[0]['user_nick']}</Text>
          <Text>뱉어내{result[0]['success']}</Text> */}

          <Text style={{color: 'black'}}>{studyName}</Text>
          <Text style={{color: 'black'}}>{studySolve}</Text>
        </SafeAreaView>
      );
}

export default CalendarView;

const styleCalendar = StyleSheet.create({
    calendar: {
      marginBottom: 10
    },
    switchContainer: {
      flexDirection: 'row',
      margin: 10,
      alignItems: 'center'
    },
    switchText: {
      margin: 10,
      fontSize: 16
    },
    text: {
      textAlign: 'center',
      padding: 10,
      backgroundColor: 'lightgrey',
      fontSize: 16
    },
    disabledText: {
      color: 'grey'
    },
    defaultText: {
      color: 'purple'
    },
    customCalendar: {
      height: 250,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
    },
    customDay: {
      textAlign: 'center'
    },
    customHeader: {
      backgroundColor: '#FCC',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: -4,
      padding: 8
    }
  });