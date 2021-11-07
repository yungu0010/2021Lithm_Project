import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import { render } from 'react-dom';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import MakeStudy from "./MakeStudy";


// Button 터치하면 MakeStudy 스크린으로 이동할 수 있도록 한다.
const NoStudy = () => {
    return (
        <View>
            <Text>스터디 초대를 기다리는 중입니다...</Text>
            <Button title= "go to MakeStudy" onPress = {() => this.props.navigation.navigate('MakeStudy')}>
            </Button>
        </View>
    );
}

//스택 네비게이터 생성하고 스크린 정의
const AppNavigator = createStackNavigator({
    NoStudy: NoStudy,
    MakeStudy: MakeStudy,
},{
    initialRouteName: 'NoStudy',
});

export default createAppContainer(AppNavigator);