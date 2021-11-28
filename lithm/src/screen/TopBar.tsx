import React, {useCallback} from 'react';
import type {FC} from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';


export const TopBar = () => {
    const navigation = useNavigation();
    const goBack = useCallback(()=>{
        navigation.goBack();
    },[]);
    return(
        <View style = {[styles.topbar]}>
            <TouchableOpacity onPress={goBack} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text><Icons name="keyboard-backspace" size={24}></Icons></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    topbar: {
        width: '100%', 
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
    }
})