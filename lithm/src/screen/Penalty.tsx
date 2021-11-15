import React, {useState} from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import {  Title, Caption } from 'react-native-paper';
import styles from '../styles/styles';

const Penalty = ({navigation} : {navigation:any}) => {

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()}></TouchableOpacity>
            <View style={{paddingHorizontal: 30, margin: 25}}>
            <Title style={styles.heading}>Penalty</Title>
            </View>
            <View>
                <Text>Study name</Text>
                <Text>10000원</Text>
            </View>
            <View>
            <TouchableOpacity style={styles.button} onPress={()=>{}}>
                            <Text style={styles.buttonText}>resset</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Penalty;