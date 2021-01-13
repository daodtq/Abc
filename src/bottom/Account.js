import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const Account = ({navigation}) => {
  const SignUp = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('LoginScreen'));
  };
  return (
    <View>
      <TouchableOpacity onPress={() => SignUp()}>
        <Text>Log Out!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
