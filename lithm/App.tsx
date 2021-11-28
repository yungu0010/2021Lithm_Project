import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView,View,Text} from 'react-native';
import Loading from './src/screen/Loading';

import DrawerNavigator from './src/screen/DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';

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
      const Stack = createStackNavigator();
      return (
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
        )
    }
  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})