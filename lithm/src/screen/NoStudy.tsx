import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MakeStudy from "./MakeStudy";


// Button 터치하면 MakeStudy 스크린으로 이동할 수 있도록 한다.
const NoStudy = ({navigation} : {navigation:any}) => {
    return (
        <View>
            <Text>스터디 초대를 기다리는 중입니다...</Text>
            <Button title= "go to MakeStudy" onPress={()=> navigation.navigate('MakeStudy')}/>
        </View>
    );
}


export default NoStudy;