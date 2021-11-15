import React, { useState ,useMemo,useEffect} from 'react';
import { ImageBackground, View, Text, StyleSheet,TouchableOpacity, TextInput, Platform, SafeAreaView } from 'react-native';
import styles from '../styles/styles';
import {Agenda, Calendar} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

  
let s,u,r: any[];

const CalendarView = ({navigation} : {navigation:any}) => {
    //내가 푼 문제들만 calendar에 나타내면 성공
    //내 색깔을 calendar에 표시해야하고, calendar 밑 view에는 내가 푼 문제들 번호 나타내기turn status + message;
    ///const [study_ti,ㅎㅁㅅ]=use
    const [studyName, setStudyname] = useState('');
    const [studySolve, setStudysolve] = useState('');
    const [studyDay, setStudyday] = useState('');
    const [userName, setUsername] = useState('');
    const [userPenalty, setUserpenalty] = useState('');
    const [bjId, setBjid] = useState('');
    const [proDate, setProdate] = useState([]);


  // const Result = ({result}:{result:any[]}) => {
  //   return(
  //     <View>
  //     <Text>{result['bj_id']}</Text>
  //     <Text>{result['success']}</Text>
  //     </View>
  //   );
  // }
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
                  const {study,user,result}=jsonRes;
        //[{'bj_id':'tlszn121','user_color':'#777777','user_nick':'아아','success':[[Array],[Array]],'fail':[['11047','2011-11-12T10:01:44.00Z']]}],  ['succes'][0]:문제번호, ['fail'][1]:시간
                  s=study;u=user;r=result;
                  setStudysolve(s['study_solve']);
                  setStudyname(s['study_title']);
                  setStudyday(s['study_day']);
                  setUsername(u['user_nick']);
                  setUserpenalty(u['user_penalty']);
                  setBjid(u['bj_id']);
                  for(let i=0; i<r.length; i++){
                    if(r[i]['bj_id'] == bjId){
                      setProdate(r[i]['success']);
                      break;
                    }
                  }
                  return {study,user,result}
              }
          } catch (err) {
              console.log(err);
          };
      })
      .then(async (element)=>{
        s=element?.study;
        u=element?.user; //나만.
        r=element?.result //users들의
        return r
      })
      //   s=element?.study; //[]
      //   u=element?.user; //나만.
      //   r=element?.result //users들의 
      //하뭇(s[''])
      //   /*let arr:any[] =[]
      //   await r.map((value,index)=>{
      //     console.log(value)
      //     arr.push (<View><Text style={{color:"black",backgroundColor:"yellow",width:30,height:30}}>{value['bj_id']}</Text></View>)
      //   })
      //   return arr;*/

      //   r.map((value,index)=>{
      //     console.log(value['bj_id']);
      //     return (
      //       <View>
      //         <Text>{value['bj_id']}</Text>
      //       </View>

      //     )
      //    })
      // })
      .catch(err => {
          console.log(err);
      });
    }


    // useEffect(()=>{getStudyInfo();ResultList(r);console.log("!@!#" + proDate);},[]);
    // const ResultList = ({result}:{result:any}) => {
    //   return (
    //     <View>
    //       {result.map((r: any,index:number)=>(
    //         <Result result={r} key={index} />
    //       ))}
    //     </View>
    //   )
    // }
    

    // const max = moment().add(100, 'years').format("YYYY-MM-DD");
    // const min = moment().substract(100, 'years').format("YYYY-MM-DD");
    // let mark = {
    //   proDate: {marked: true, disabled: false}
    // };
    useEffect(()=>getStudyInfo(),[])

      return (
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}><Text>뒤로 가기</Text></TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Text>{userName}</Text>
          <Text>{userPenalty}</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
            <Text >profile</Text>
          </TouchableOpacity> 
          
          <Text>함수 실행 되나</Text>
          <Calendar style={styleCalendar.calendar} 
            maxDate={new Date(1999, 1, 1)}
            minDate={new Date(2999, 12, 31)}
            enableSwipeMonths
            >
          </Calendar>
          <TouchableOpacity >
          <Text style={{color: 'black'}}>{studyName}</Text>
          </TouchableOpacity> 
          <Text style={{color: 'black'}}>{studySolve}</Text>

             {/* <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2021-05-16'}
                renderItem={renderItem}
            />  */}
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