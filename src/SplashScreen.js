import React, {useEffect, useState} from 'react';
import {Dimensions, Text, Image, StyleSheet, View} from 'react-native';
import database from '@react-native-firebase/database';

const SplashScreen = () => {
  const [DataLogo, setDataLogo] = useState();
  useEffect(() => {
    database()
      .ref('/logo/logo')
      .once('value')
      .then((snapshot) => {
        setDataLogo(snapshot.val());
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.view2}>
        <Image style={styles.imgLogo} source={{uri: DataLogo}} />
      </View>
    </View>
  );
};

export default SplashScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  imgSplash: {
    width: windowWidth,
    height: 100,
  },
  view2: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    width: 150,
    height: 150,
  },
});
