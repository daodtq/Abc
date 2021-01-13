/**
 * @format
 */
import React, {useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
import SplashScreen from './src/SplashScreen';
import App from './App';
const Main = () => {
  const [screen, setScreen] = useState(true);
  let mainScreen = screen === true ? <SplashScreen /> : <App />;
  console.log(screen);
  useEffect(() => {
    setTimeout(() => {
      setScreen(false);
    }, 4000);
  }, []);
  return mainScreen;
};

AppRegistry.registerComponent(appName, () => Main);
