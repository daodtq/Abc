import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Account from '../bottom/Account';
import Note from '../bottom/Note';
import Trash from '../bottom/Trash';
import {ACCOUNT, NOTE, TRASH} from '../Screen_Name';

const Tab = createDrawerNavigator();

const NavigatorScreen = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName={NOTE}
      activeColor="white"
      inactiveColor="white"
      barStyle={{backgroundColor: '#a1cac8'}}>
      <Tab.Screen
        name={NOTE}
        component={Note}
        options={{
          tabBarLabel: 'Note',
          tabBarIcon: ({color}) => (
            <Image
              style={styles.img}
              source={{
                uri:
                  'https://thumbs.gfycat.com/YellowReliableLabradorretriever-max-1mb.gif',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TRASH}
        component={Trash}
        options={{
          tabBarLabel: 'Trash',
          tabBarIcon: ({color}) => (
            <Image
              style={styles.img}
              source={{
                uri:
                  'https://thumbs.gfycat.com/GregariousDisgustingAnkole-small.gif',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ACCOUNT}
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color}) => (
            <Image
              style={styles.img}
              source={{
                uri:
                  'https://66.media.tumblr.com/tumblr_macxenoiWY1rfjowdo1_500.gif',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 30,
    height: 30,
  },
});
