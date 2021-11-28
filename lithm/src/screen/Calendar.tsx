import React, { useState ,useMemo, useLayoutEffect, useRef} from 'react';
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
    const [studyName, setStudyname] = useState('');   //스터디명
    const [studySolve, setStudysolve] = useState(''); //스터디 문제풀이 규칙
    const [studyDay, setStudyday] = useState('');     //스터디 리셋 날짜
    const [userName, setUsername] = useState('');     //유저이름
    const [userPenalty, setUserpenalty] = useState(''); //유저벌금
    const [userColor,setUsercolor]=useState(''); //유저색상

    //agenda에서 사용
    const [items, setItems] = useState<{[key: string]: Item[]}>({
      '2021-11-29': [{userName: 'Choi', success: '2110', fail: '14439', color: '#a4c0b4'}, {userName: 'YoonDol', success: '2439', fail:'', color: '#e78f29'}],
      '2021-11-30': [{userName: 'YoonDol', success: '1020', fail:'', color: '#e78f29'}],
    })

    const renderItem = (item: Item) => {
      let Color = item.color;
      if(item.success&& item.fail){ //둘 다 존재
        return(
          <View style={{top:10,padding:10}}>
            <View style={{borderColor:Color, borderRadius:7,borderWidth:3, maxWidth:100, paddingBottom:3, backgroundColor:'white'}}><Text style={[Calendarstyle.nameStyle]}>{item.userName}</Text></View>
            <View style={{flexDirection:'row'}}>
              <Text style={[{color:'black',paddingBottom:0},Calendarstyle.problemStyle]}>{item.success} </Text>
              <Text style={[{color:'#0078FF',paddingBottom:0},Calendarstyle.problemStyle]}>Success</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={[{color:'black'},Calendarstyle.problemStyle]}>{item.fail} </Text>
              <Text style={[{color:'#CD1F48'},Calendarstyle.problemStyle]}>Fail</Text>
            </View>
            
          </View>
        )

      }
      else if (item.success){ //성공만 존재
        return(
          <View style={{padding:10, top:10}}>
            <View style={{borderColor:Color, borderRadius:7,borderWidth:3, maxWidth:100, paddingBottom:3,backgroundColor:'white'}}><Text style={[Calendarstyle.nameStyle]}>{item.userName}</Text></View>
            <View style={{flexDirection:'row'}}>
              <Text style={[{color:'black'},Calendarstyle.problemStyle]}>{item.success} </Text>
              <Text style={[{color:'#0078FF'},Calendarstyle.problemStyle]}>Success</Text>
            </View>
          </View>
        )
      }
     
    }
    
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
                const {study,user}=jsonRes; //members 가져올 수 있음
                setStudysolve(study['study_solve']);
                setStudyname(study['study_title']);
                setStudyday(study['study_day']);
                setUsername(user['user_nick']);
                setUserpenalty(user['user_penalty']);           
                setUsercolor(user['user_color']);    
            } 
        } catch (err) {
            console.log(err);
        };
      })
      .catch(err => {
          console.log(err);
      });
    }

    useLayoutEffect(()=>getStudyInfo(),[])

    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <TopBar></TopBar>
        <View>
        <View><Text style={{fontWeight:'700',fontSize:35,color:"black",textAlign:'center'}}>{studyName}</Text></View>
        <View><Text style={[Calendarstyle.description,{padding:5}]}>{`${studySolve} problems a week, on ${studyDay}`}</Text></View>
        <View style={{top:15,flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{left:20, top:25, marginRight:20,width: 20, height: 20, borderRadius: 30, backgroundColor: userColor}}></View>
          <Text style={{fontWeight:'700',fontSize:25,textAlign:'center',color:"black",padding:10,paddingTop:15}}>{userName}</Text>
        </View>
        <Text style={[Calendarstyle.description,{padding:10,paddingTop:20,paddingRight:20}]}>{`${userPenalty}￦`}</Text>
        </View>
        </View>
        <Agenda
          selected={'2021-11-28'}
          items={items}
          renderItem = {renderItem}
          style={{top:20}}
        />
        <View style={{backgroundColor:'white'}}><Text style={[Calendarstyle.description,{padding:10,textAlign:'right',paddingRight:20}]}>1 problems left</Text></View>
      </SafeAreaView>
    );
}

export default CalendarView;

const Calendarstyle = StyleSheet.create({
    description: {
      textAlign:'center',
      fontSize:20, 
      fontWeight:'500', 
      color:Colors.grey500
    },
    nameStyle:{
      color:'black',
      textAlign:'center',
      fontSize:16, 
      fontWeight:'500'
    },
    problemStyle:{
      padding:10, 
      fontWeight:'bold',
      paddingLeft:15
    },
  });