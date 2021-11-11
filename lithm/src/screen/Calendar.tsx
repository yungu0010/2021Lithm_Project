import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet,TouchableOpacity, TextInput, Platform } from 'react-native';
import styles from '../styles/styles';
import {Agenda} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';
const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

const timeToString = (time : number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

const CalendarView: React.FC = () => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);
    let s,u,us;
    //내가 푼 문제들만 calendar에 나타내면 성공
    //내 색깔을 calendar에 표시해야하고, calendar 밑 view에는 내가 푼 문제들 번호 나타내기
    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
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
                const jsonRes = await res.json();   //headers, url, bodyUsed 등을 message 타입으로 변경   
                if (res.status === 200) {  //Auth.js 에서 넘겨준 status
                    setMessage(jsonRes.message);
                    const {study,user,users, problems}=jsonRes;
                    s=study;
                    u=user;
                    us=users;
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }
    getStudyInfo();

    const loadItems = (day: { timestamp: number; }) => {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!items[strTime]) {
              items[strTime] = [];
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                  name: 'Item for ' + strTime + ' #' + j,       //유저가 푼 문제 어쩌고 들어갈 공간
                  height: Math.max(50, Math.floor(Math.random() * 150))
                });
              }
            }
          }
          const newItems = {};
          Object.keys(items).forEach(key => {
            newItems[key] = items[key];
          });
          setItems(newItems);
        }, 1000);
      };

      const renderItem = (item: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
        return (<TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
            <Card>
                <Card.Content>
                    <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems : 'center'}}>
                        <Text>{item.name}</Text>
                        <Avatar.Text label="J"/>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>)
      }
     
      return (
        <View style={{flex:1}}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2021-05-16'}
                renderItem={renderItem}
                />
        </View>
      );
}

export default CalendarView;