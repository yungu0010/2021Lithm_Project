import React, {useEffect,useState,useCallback} from 'react';
import Loading from './src/screen/Loading';
import DrawerNavigator from './src/navigate/DrawerNavigator';
import { NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {Provider as PaperProvider} from 'react-native-paper';
import {DefaultTheme, DarkTheme} from 'react-native-paper';
import {ToggleProvider} from './src/theme/ToggleThemeContext';

const App = () => {
  const scheme = useColorScheme(); //현재 휴대폰의 scheme알 수 있음
  const [theme, setTheme] = useState(
    //현재 휴대폰 scheme 따라 theme변경
    scheme == 'dark' ? DarkTheme : DefaultTheme
  );
  const toggleTheme = useCallback(() => {
    //theme.dark가 참이면 defaultTheme을 리턴. 아니면 darkTheme리턴
    return setTheme(theme => (theme.dark ? DefaultTheme : DarkTheme));
  }, []);
  
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1500)
  },[]);

    return loading ? <Loading></Loading> : (
      <AppearanceProvider>
        <PaperProvider theme={theme}>
          <ToggleProvider toggle={toggleTheme}>
          <NavigationContainer>
            <DrawerNavigator/>
          </NavigationContainer>
          </ToggleProvider>
        </PaperProvider>
      </AppearanceProvider>    
    )

}
export default App;
