import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Polygon, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as geolib from 'geolib';
import {MyModal} from '../../../components/MyModal';
import styles from './styles';
import {MyButton} from '../../../components/MyButton';
const AreaCalculator = () => {
  useEffect(() => {
    getCurrentLocation();
  }, []);

  //+++++++ USESTATES / VARIABLES / REFS ++++++++//

  const [myLat, setMyLat] = useState();
  const [myLong, setMyLong] = useState();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [areasList, setAreasList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalListVisible, setModalListVisible] = useState(false);
  const [nameText, setNameText] = useState('');
  const [myTimeout, setMyTimeout] = useState(true);
  const mapRef = useRef();
  let tempArr = [...polylinePoints];

  //+++++++++ FUNCTIONS +++++++//

  const getCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization('whenInUse');
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    Geolocation.getCurrentPosition(
      position => {
        setMyLat(position.coords.latitude);
        setMyLong(position.coords.longitude);
      },
      error => {
        Toast.show('An error occured, please try again', Toast.SHORT);
        setError(true);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const Calculate = () => {
    let areaOfPolygon = geolib.getAreaOfPolygon(polylinePoints);
    Toast.show('Area Saved', Toast.SHORT);
    let __ = [...areasList];
    __.unshift({
      name: nameText,
      coordinates: polylinePoints,
      area: Math.round(areaOfPolygon * 10) / 10,
    });

    setAreasList(__);
    setModalVisible(false);
    setEditing(false);
    setDrawing(false);
    setNameText('');
    setModalListVisible(true);
  };

  // +++++++++ RENDER ITEMS ++++++++++ //

  const renderItemAreas = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setModalListVisible(false);
            setTimeout(() => {
              setPolylinePoints(item.coordinates);
              mapRef.current.animateToRegion({
                latitude: item.coordinates[0].latitude,
                longitude: item.coordinates[0].longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              });
            }, 500);
          }}
          activeOpacity={0.7}
          style={styles.nameView}>
          <Text style={styles.listNameText}>{item.name}</Text>
          <View>
            <Text>
              {item.area}
              {' Sq. Meter'}
            </Text>
            <Text>
              {Math.round((item.area / 25.293) * 10) / 10}
              {' Marla'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //+++++++++++  MAIN RETURN  ++++++++++//

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {(myLat || myLong) === undefined ? (
        <View style={styles.indicatorView}>
          {error ? (
            <MyButton
              title={'Try Again'}
              onPress={() => {
                setError(false);
                getCurrentLocation();
              }}
            />
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
      ) : (
        <>
          <MyModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            modalBody={
              <>
                <Text style={styles.enterNameText}>Enter name of area</Text>
                <TextInput
                  style={styles.textInput}
                  value={nameText}
                  onChangeText={text => {
                    setNameText(text);
                  }}
                />
                <MyButton
                  disabled={nameText === '' ? true : false}
                  title={'Add'}
                  onPress={() => {
                    Calculate();
                  }}
                />
              </>
            }
          />
          <MyModal
            visible={modalListVisible}
            onRequestClose={() => setModalListVisible(false)}
            modalBody={
              <>
                <View
                  style={{
                    height: Dimensions.get('window').height / 2.5,
                  }}>
                  <FlatList data={areasList} renderItem={renderItemAreas} />
                </View>
              </>
            }
          />
          {!drawing && (
            <MyButton
              disabled={areasList.length === 0}
              title={'Saved Areas'}
              onPress={() => {
                setModalListVisible(true);
              }}
              myStyles={styles.savedButton}
              itsTextStyle={{opacity: areasList.length === 0 ? 0.5 : 1}}
            />
          )}

          <MapView
            ref={mapRef}
            style={styles.mapview}
            region={{
              latitude: myLat,
              longitude: myLong,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
            showsCompass={false}
            scrollEnabled={drawing ? false : true}
            zoomEnabled={drawing ? false : true}
            mapType={'satellite'}
            onPanDrag={item => {
              if (drawing) {
                tempArr[tempArr.length] = item.nativeEvent.coordinate;
                if (myTimeout) {
                  // LOGIC FOR PUSING LESS COORDINATES IN POLYGON AND SPEED UP
                  tempArr[tempArr.length - 30];
                  setMyTimeout(false);
                  setTimeout(() => {
                    setMyTimeout(true);
                  }, 1);
                  setPolylinePoints(tempArr);
                }
              }
            }}
            showsUserLocation
            onTouchEnd={() => {
              setDrawing(false);
            }}>
            {polylinePoints.length > 1 &&
              (drawing ? (
                <Polyline
                  coordinates={polylinePoints}
                  strokeColor={'red'}
                  strokeWidth={3}
                />
              ) : (
                <Polygon
                  coordinates={polylinePoints}
                  strokeColor={'red'}
                  strokeWidth={3}
                />
              ))}
          </MapView>
          {editing ? (
            !drawing && (
              <View style={styles.twoButtonsView}>
                <MyButton
                  title={'Calculate area and save'}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
                <MyButton
                  title={'Discard'}
                  onPress={() => {
                    setEditing(false);
                    setDrawing(false);
                    setPolylinePoints([]);
                  }}
                />
              </View>
            )
          ) : (
            <MyButton
              title={'Draw on map'}
              onPress={() => {
                setPolylinePoints([]);
                setEditing(true);
                setDrawing(true);
              }}
              myStyles={styles.buttonView}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default AreaCalculator;
