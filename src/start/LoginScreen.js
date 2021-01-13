import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import NavigatorScreen from './NavigatorScreen';

const LoginScreen = ({navigation}) => {
  //Check Status Firebase
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const Login = (username, password) => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        console.log('Login Success');
        navigation.navigate('NavigatorScreen');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  if (initializing) return null;
  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.viewcenter}>
          <Image
            style={styles.imgLogo}
            source={{
              uri: 'https://img.icons8.com/color/452/firebase.png',
            }}
          />
          <View style={styles.viewlogin}>
            <Image
              style={styles.imgLogo1}
              source={{
                uri:
                  'https://img.thuthuatphanmem.vn/uploads/2018/09/22/avatar-trang-den-dep_015640236.png',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(u) => setUsername(u)}
            />
          </View>
          <View style={styles.viewlogin}>
            <Image
              style={styles.imgLogo1}
              source={{
                uri:
                  'https://img.thuthuatphanmem.vn/uploads/2018/09/22/avatar-trang-den-dep_015640236.png',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(p) => setPassword(p)}
            />
          </View>
          <TouchableOpacity
            style={styles.bottom}
            onPress={() => Login(username, password)}>
            <Text>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return <NavigatorScreen />;
};

export default LoginScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewcenter: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imgLogo: {
    width: 200,
    height: 200,
  },
  imgLogo1: {
    marginLeft: 8,
    width: 25,
    height: 25,
  },
  bottom: {
    width: 200,
    height: 30,
  },
  viewlogin: {
    flexDirection: 'row',
    backgroundColor: '#DDD',
    width: windowWidth - 50,
    height: 50,
    marginBottom: 8,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    opacity: 0.6,
  },
  input: {
    opacity: 0.6,
    width: windowWidth - 100,
  },
  bottom: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: windowWidth - 200,
    height: 40,
    backgroundColor: '#DDD',
    borderRadius: 30,
  },
});
