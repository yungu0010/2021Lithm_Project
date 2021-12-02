import React, {useState,useLayoutEffect} from 'react';
import {View, Text,TextInput,StyleSheet,SafeAreaView, TouchableOpacity,Platform, Modal,ScrollView, Dimensions} from 'react-native';
import {TopBar} from '../navigate/TopBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

let u,s,c,p;
const Profile = ({navigation} : {navigation:any}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
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
  const [bjID, setBjID]=useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
        setBjID(u['bj_id']); setNick(u['user_nick']);setColor(u['user_color']);setTitle(s['study_title']);setEmail(u['user_email']);setCount(c);setPenalty(u['user_penalty']);setSuccess(p['success']);setFail(p['fail']);setStudySolve(s['study_solve']);
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
      <ScrollView horizontal={false}>
      <View style={{marginHorizontal: '10%'}}>
        <View>
            <View style={[styles.flex, {marginTop: 15}]}>
                <Text style={[styles.heading_pro,{color:'black'}]}>{nick}  
                    <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
                    <View style={Modalstyles.centeredView}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <View style={[Modalstyles.centeredView]}>
                            <View style={[Modalstyles.modalView]}>
                            <View style={{alignSelf:'flex-end'}}><TouchableOpacity onPress={()=>{setModalVisible(!modalVisible);}}><Text style={{textAlign:'right',color:'black'}}>x</Text></TouchableOpacity></View>
                            <TextInput style={Modalstyles.modalText} onChangeText={setNick} autoFocus={true}></TextInput>
                            <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible);editNick();}} style={[Modalstyles.button, Modalstyles.buttonClose]}><Text style={Modalstyles.textStyle}>Submit</Text></TouchableOpacity>
                            </View>
                        </View>
                        </Modal></View>
                      <Icon name="pencil" size={20} style={{color:'grey', padding: '5%'}}></Icon>
                    </TouchableOpacity>
                  </Text>
                <View style={[styles.profile, {backgroundColor: color}]}></View>
            </View>
        </View>

        <View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="email" color="#777777" size={20}></Icon>
          <Text style={{color:'black'}}>  {email}</Text>
        </View>
        <View style={{marginVertical:'5%', borderTopColor:'grey',borderTopWidth:1}}></View>
        <Text style={{color:'black'}}>{bjID}</Text>
        <View style={{marginVertical:'5%', borderTopColor:'grey',borderTopWidth:1}}></View>

      </View>
      <View>
          <Text style={styles.heading_study}>My Study</Text>

          <View style={styles.profile_card}>
                <View style={[styles.flex, {marginBottom: 5}]}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color:'black'}}>{title}</Text>
                    <View>
                    <Text style={{color:'black'}}><Icon name="account-group" size={20}></Icon>   {count}</Text>
                    </View>
                </View>

                <View style={[styles.flex, {marginVertical: 10}]}>
                    <Text style={{color:'black'}}>Penalty</Text>
                    <Text style={{color:'black'}}>￦ {penalty}</Text>
                </View>

                <View style={[styles.flex]}>
                    <Text style={{color:'black'}}>Progress</Text>
                    <Text style={{color:'black'}}><Text style={{fontWeight: 'bold'}}>{`${solve}`}</Text>문제 중 1문제 성공</Text>
                </View>
                <View style={{alignSelf:'flex-end', marginTop:'5%'}}>
                    <TouchableOpacity onPress={resignStudy}style={{flexDirection:'row'}}>
                        <Text style={{color:'#808080'}}>Resign </Text>
                        <Icon name="exit-to-app" size={20} style={{color:'#808080'}}></Icon>
                    </TouchableOpacity>
                </View>
          </View>
      </View>
      <View style={{marginVertical:'5%', borderTopColor:'grey',borderTopWidth:1}}></View>
      <View>
          <View style={{marginVertical: '2%'}}>
            <Text style={{fontWeight: '700',fontSize: 17, color: '#0078FF'}}>success</Text><Text style={{fontSize:15, marginTop:'2%', color:'black'}}>{success.map((s,idx)=><Text key={idx}>{s+"      "}</Text>)}</Text>
          </View>
          <View style={{marginVertical: '2%'}}>
            <Text style={{fontWeight: '700', fontSize: 17, color:'#CD1F48'}}>fail</Text><Text style={{fontSize:15, marginTop:'2%',color:'black'}}>{fail.map((f,idx)=><Text key={idx}>{f+"      "}</Text>)}</Text>
          </View>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
const Modalstyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  