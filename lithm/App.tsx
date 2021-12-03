import React, {useEffect,useState,useCallback} from 'react';
import Loading from './src/screen/Loading';
import DrawerNavigator from './src/navigate/DrawerNavigator';
import { NavigationContainer} from '@react-navigation/native';
import { makeStore } from "./src/store/makeStore";
import {Provider as ReduxProvider} from "react-redux"; 

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1500)
  },[]);
  
  const store=makeStore();

    return loading ? <Loading></Loading> : (
        <ReduxProvider store={store}>
          <NavigationContainer>
            <DrawerNavigator/>
          </NavigationContainer>
        </ReduxProvider> 
    )

}
export default App;
