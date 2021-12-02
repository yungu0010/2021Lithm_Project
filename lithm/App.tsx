import React, {useEffect,useState,useCallback} from 'react';
import Loading from './src/screen/Loading';
import DrawerNavigator from './src/navigate/DrawerNavigator';
import { NavigationContainer} from '@react-navigation/native';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1500)
  },[]);

    return loading ? <Loading></Loading> : (
          <NavigationContainer>
            <DrawerNavigator/>
          </NavigationContainer>  
    )

}
export default App;
