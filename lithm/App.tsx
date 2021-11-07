import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView} from 'react-native';
import Loading from './src/screen/Loading';
import AuthScreen from './src/screen/AuthScreen';


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
              <AuthScreen/>    
        </SafeAreaView>)
    }

  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})