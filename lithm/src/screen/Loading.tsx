import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const Loading = () => {
    return (
        <ImageBackground
        source={require('../img/loading_sample.png')}
        style={{flex:1}}>
        </ImageBackground>   
    );
}

export default Loading;