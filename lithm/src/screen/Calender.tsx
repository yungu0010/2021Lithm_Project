import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet,TouchableOpacity, TextInput, Platform } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from '../styles/styles';

const CalendarView = ({navigation} : {navigation:any}) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    //내가 푼 문제들만 calendar에 나타내면 성공
    //내 색깔을 calendar에 표시해야하고, calendar 밑 view에는 내가 푼 문제들 번호 나타내기

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }


    return (
        <View>
            <Calendar 
            minDate={new Date(2000, 3, 20)}
            maxDate={new Date(2099, 12, 31)}
            monthFormat={'yyyy MM'}>
            </Calendar>
        </View>

    );
}

export default CalendarView;