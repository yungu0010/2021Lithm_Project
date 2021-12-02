import React from "react";
import { ImageBackground } from "react-native";

const Loading = () => {
    return (
        <ImageBackground
        source={require('../img/loading.jpg')}
        style={{flex:1}}>
        </ImageBackground>   
    );
}

export default Loading;