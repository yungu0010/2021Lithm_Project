import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, TouchableOpacity,Platform} from 'react-native';
import { Title, Caption, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Card } from 'react-native-shadow-cards';
const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

let u,s,c,r;
const getProfile = () => {
    fetch(`${API_URL}/profile`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
        },
    })
    .then(async res => { //res를 가져옴
        try {
            const jsonRes = await res.json();   //headers, url, bodyUsed 등을 message 타입으로 변경  
            if (res.status === 200) {  //Auth.js 에서 넘겨준 status
                const {user,study,count,result}=jsonRes; //나,스터디,인원,푼 문제들
                return {user,study,count,result}
            }
        } catch (err) {
            console.log(err);
        };
    })
    .then((element)=>{
        u=element?.user; s=element?.study; c=element?.count; r=element?.result;
        console.log(s);
    })
    .catch(err => {
        console.log(err);
    });
}

const Profile = () => {
  getProfile();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
            {/* //프로필 사진 넣기 */}
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>하</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Baekjoon id</Text>
        </View>
      </View>

      <View>
          <Text style={{marginLeft: 20}}>My Study</Text>
          {/* <Card style={styles.card}>
              <View style={{flexDirection: 'row'}}>
              <Text>내 스터디 이름</Text>
              <Text><Icon name="account-group" size={20}></Icon>스터디 인원</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
              <Text >Penalty</Text>
              <Text>내 벌금</Text>
              </View>
              <Text>진행 현황</Text>
          </Card> */}
      </View>
      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.problems}>
            <Text style={styles.problemText}>success</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.problems}>
            <Text style={styles.problemText}>fail</Text>
          </View>
        </TouchableOpacity>
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