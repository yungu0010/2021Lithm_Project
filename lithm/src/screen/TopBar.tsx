import React, {useCallback} from 'react';
import type {FC} from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//
import { useNavigation } from '@react-navigation/native';


export const TopBar = () => {
    const navigation = useNavigation();
    const goProfile = useCallback(()=>{
        navigation.navigate("Profile");
    },[]);
    const goManage = useCallback(()=>{
        navigation.navigate("Manage");
    },[]);
    return(
        <View style = {[styles.topbar]}>
            <TouchableOpacity onPress={goProfile} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Profile</Text>
{/** */}
            </TouchableOpacity>
            <TouchableOpacity onPress={goManage} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Manage</Text>
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