import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../bottom/Home';
import Trash from '../bottom/Trash';
import Account from '../bottom/Account';
import DrawerContent from '../drawer/DrawerContent';

const Drawer = createDrawerNavigator();

const NavigatorScreen = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Trash" component={Trash} />
      <Drawer.Screen name="Account" component={Account} />
    </Drawer.Navigator>
  );
};

export default NavigatorScreen;

const styles = StyleSheet.create({});
