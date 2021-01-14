import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicatorBase,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import {FlatList} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import {ActivityIndicator} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const initialState = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const Home = ({navigation}) => {
  //GPS
  const [currentPosition, setCurrentPosition] = useState(initialState);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {longitude, latitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (error) => alert(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  }, []);

  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const NewsItem1 = (props) => (
    <TouchableOpacity
      style={styles.oneItem}
      delayPressIn={0}
      onPress={() => setModalVisible(!modalVisible)}>
      <View>
        <Image style={styles.imgShow} source={{uri: props.newsItem.image}} />
      </View>
      <View>
        <View>
          <Text>{props.newsItem.name}</Text>
        </View>
        <View>
          <Text>{props.newsItem.note}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const clickItem = (props) => {
    setModalVisible(true);
  };
  //Data
  const [data, setData] = useState([]);
  useEffect(() => {
    database()
      .ref('/dichvu/')
      .on('value', (snapshot) => {
        let items = [];
        snapshot.forEach((element) => {
          let item = {
            _key: element.key,
            image: element.val().image,
            name: element.val().name,
            note: element.val().note,
          };
          items.push(item);
        });
        setData(items);
      });
    return () => {};
  }, []);

  const [user, setUser] = useState('abc');

  function onAuthStateChanged(user) {
    setUser(user);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return currentPosition.latitude ? (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentPosition}></MapView>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image
          style={styles.menu}
          source={{
            uri: 'https://img.icons8.com/cotton/2x/menu.png',
          }}
        />
      </TouchableOpacity>
      <View style={styles.viewBottom}>
        <TouchableOpacity
          style={styles.viewBottom1}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.imgUp}
              source={{
                uri:
                  'https://media2.giphy.com/media/U24HYmD7xBdRUv1W6A/giphy.gif',
              }}
            />
            <Text>Tất cả dịch vụ</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.viewBottom2}>
          <View style={styles.viewBottom21}></View>
          <View style={styles.viewBottom22}></View>
          <TouchableOpacity
            style={styles.viewBottom23}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}></TouchableOpacity>
        </View>
        <View style={styles.viewBottom3}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              style={styles.addImg}
              source={{
                uri:
                  'https://www.freeiconspng.com/uploads/blue-location-icon-26.png',
              }}
            />
            <Text style={{color: '#AAAAAA'}}>Vị trí của bạn là?</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewBottom4}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              style={styles.addImg}
              source={{
                uri:
                  'https://www.pngitem.com/pimgs/m/112-1121197_ios-add-icon-green-hd-png-download.png',
              }}
            />
            <Text style={{color: '#468c00'}}>Nhập địa điểm giao hàng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewBottom5}>
          <Text style={{color: 'white'}}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <FlatList
                data={data}
                contentContainerStyle={styles.containerList1}
                renderItem={({item}) => <NewsItem1 newsItem={item} />}
                keyExtractor={(item) => item._key}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} animating size="large" />
  );
};

export default Home;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
  },
  menu: {
    width: 40,
    height: 40,
    margin: 15,
    top: 0,
  },
  map: {
    width: windowWidth,
    height: windowHeight - 270,
  },
  viewBottom: {
    width: windowWidth,
    height: 250,
    backgroundColor: 'white',
    bottom: 0,
    padding: 10,
    position: 'absolute',
  },
  viewBottom1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imgUp: {width: 15, height: 15},
  viewBottom2: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewBottom21: {
    width: windowWidth - 130,
    height: 80,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
  },
  viewBottom22: {
    position: 'absolute',
    width: windowWidth - 90,
    height: 70,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  viewBottom23: {
    position: 'absolute',
    width: windowWidth - 20,
    height: 60,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  viewBottom3: {flex: 1.5, flexDirection: 'row'},
  viewBottom4: {flex: 1.5, flexDirection: 'row'},
  addImg: {width: 15, height: 15},
  viewBottom5: {
    flex: 1.5,
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#888888',
  },
  modal: {
    position: 'absolute',
    width: windowWidth,
    height: 200,
    bottom: -20,
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  oneItem: {
    alignItems: 'center',
    width: windowWidth - 20,
    height: 60,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  imgShow: {
    width: 25,
    height: 25,
    margin: 10,
  },
});
