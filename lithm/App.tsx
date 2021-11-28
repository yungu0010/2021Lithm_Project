import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView,View,Text} from 'react-native';
import Loading from './src/screen/Loading';
import AuthScreen from './src/screen/AuthScreen';
import NoStudy from './src/screen/NoStudy';
import MakeStudy from './src/screen/MakeStudy';
import Profile from './src/screen/Profile';
import CalendarView from './src/screen/Calendar';
import Manage from './src/screen/Manage';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default class extends React.Component {
  state={
    isLoading:true
  };

  componentDidMount = async() => {
    // 1000 = 1s
    setTimeout(() => {this.setState({isLoading : false})}, 3000);
  }
  render(){
    if(this.state.isLoading){
      return <Loading></Loading>
    }else{
      const Stack = createStackNavigator();     //screenOptions={{headerShown: false}}
      return (
        <NavigationContainer>
          <SafeAreaView style={styles.safeAreaView}>
                <Stack.Navigator initialRouteName="AuthScreen">
                  <Stack.Screen name="AuthScreen" component={AuthScreen}/>
                  <Stack.Screen name="NoStudy" component={NoStudy}/>
                  <Stack.Screen name="MakeStudy" component={MakeStudy}/>
                  <Stack.Screen name="CalendarView" component={CalendarView}/>
                  <Stack.Screen name="Profile" component={Profile}/>
                  <Stack.Screen name="Manage" component={Manage}/>
                </Stack.Navigator>
              
          </SafeAreaView>
        </NavigationContainer>
        )
    }

  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})