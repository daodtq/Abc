import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/start/LoginScreen';
import RegisterScreen from './src/start/RegisterScreen';
import NavigatorScreen from './src/start/NavigatorScreen';
import {LOGINSCREEN, REGISTERSCREEN, NAVIGATORSCREEN} from './src/Screen_Name';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {AuthContext} from './components/Context';

const Stack = createStackNavigator();
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const authContext = useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            initialRouteName={LOGINSCREEN}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name={LOGINSCREEN} component={LoginScreen} />
            <Stack.Screen name={REGISTERSCREEN} component={RegisterScreen} />
            <Stack.Screen name={NAVIGATORSCREEN} component={NavigatorScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
