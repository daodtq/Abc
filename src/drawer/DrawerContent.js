import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../components/Context';

const DrawerContent = (props) => {
  const SignOut = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('LoginScreen'));
  };
  const [user, setUser] = useState({email: 'abc@gmail.com'});

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const paperTheme = useTheme();

  const {toggleTheme} = useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://img.thuthuatphanmem.vn/uploads/2018/09/22/avatar-trang-den-dep_015640236.png',
                }}
                size={50}
              />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Title style={styles.title}>{user.email}</Title>
                <Caption style={styles.caption}>{user.email}</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraph, styles.caption)}>
                  80
                </Paragraph>
                <Avatar.Image
                  source={{
                    uri:
                      'https://www.iconpacks.net/icons/2/free-euro-coin-icon-2141-thumb.png',
                  }}
                  size={20}
                />
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerContent}>
            <DrawerItem
              icon={({color, size}) => {
                <Icon name="home-outline" color={color} size={size} />;
              }}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => {
                <Icon name="home-outline" color={color} size={size} />;
              }}
              label="Trash"
              onPress={() => {
                props.navigation.navigate('Trash');
              }}
            />
            <DrawerItem
              icon={({color, size}) => {
                <Icon name="account-check-outline" color={color} size={size} />;
              }}
              label="Account"
              onPress={() => {
                props.navigation.navigate('Account');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Settings">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => {
            <Icon name="exit-to-app" color={color} size={size} />;
          }}
          label="Sign Out"
          onPress={() => SignOut()}
        />
      </Drawer.Section>
    </View>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    marginRight: 5,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    margin: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
