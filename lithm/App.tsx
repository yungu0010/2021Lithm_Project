import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './src/screen/Loading';
import AuthScreen from './src/screen/AuthScreen';
import NoStudy from './src/screen/NoStudy';

const Stack = createStackNavigator();

export default class extends React.Component { //class로 바꾼모습
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
      return (
        <SafeAreaView style={styles.safeAreaView}>
    
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Main" component={NoStudy}  options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
          
        </SafeAreaView>)
    }

  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})