import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView,View,Text} from 'react-native';
import Loading from './src/screen/Loading';
import AuthScreen from './src/screen/AuthScreen';
import NoStudy from './src/screen/NoStudy';
import MakeStudy from './src/screen/MakeStudy';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import DrawerBar from './src/navigations/SideMenu';


export default class extends React.Component { //class로 바꾼모습 뉘신지..?
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
      // const Drawer = createDrawerNavigator();
      // const NavigationDrawerStructure = (props) => {
      //   const toggleDrawer = () => {
      //     props.navigationProps.toggleDrawer();
      //   }
      // }
      return (
        <NavigationContainer>
          <SafeAreaView style={styles.safeAreaView}>
            {/* <Drawer.Navigator drawerContentOptions={{
              activeTintColor: '#e91263', itemStyle: {marginVertical: 5}
            }}>
              <Drawer.Screen name="Profile" options={{drawerLabel: 'Profile'}} component={mypage}></Drawer.Screen>
              <Drawer.Screen name="Penalty" options={{drawerLabel: 'Penalty'}} component={penalty}></Drawer.Screen>
            </Drawer.Navigator> */}
                <Stack.Navigator initialRouteName="AuthScreen">
                  <Stack.Screen name="AuthScreen" component={AuthScreen}/>
                  <Stack.Screen name="NoStudy" component={NoStudy}/>
                  <Stack.Screen name="MakeStudy" component={MakeStudy}/>
                </Stack.Navigator>
              
          </SafeAreaView>
        </NavigationContainer>)
    }

  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})