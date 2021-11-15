import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Manage = () => {
    const [studyName, setStudyname] = useState('');
    const [studySolve, setStudy] = useState('');
    return (
        <SafeAreaView>
            <Text>스터디 명</Text>
            <View style={{flexDirection:'row'}}>
                <Icon  name="account-group" color="#777777" size={20}/>
                <Text>Mate</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Icon name="plus-thick" color="black" size={20}/>
                </TouchableOpacity>
            </View>

            <View>
            </View>
            
        </SafeAreaView>
    );
};

