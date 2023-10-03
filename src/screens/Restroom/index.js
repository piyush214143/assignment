/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, PermissionsAndroid, ActivityIndicator, Modal, Pressable, Image, Location, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import HeaderComponent from '../../component/HeaderComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGES } from '../../assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import * as geolib from 'geolib';



const Restroom = (props) => {
  // state to hold location
  const taskData = props?.route?.params?.item
  const staticLocation = { latitude: Number(taskData?.lat_details).toFixed(7), longitude: Number(taskData?.long_details).toFixed(7) };
  const [pickerImage, setPickedImage] = useState('');
  const [remark, setRemark] = useState('');
  const [pickerImage2, setPickedImage2] = useState('');
  const [pickerImage3, setPickedImage3] = useState('');
  const [pickerImage4, setPickedImage4] = useState('');
  const [current_lat, setCurrent_lat] = useState(null);
  const [current_long, setCurrent_long] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);


  // const openImagePicker = async (setState) => {
  //   const result = onClick();
  //   result.then(res => {
  //     console.log("reeeeeeeeeeeeeeeeeeeee", res)
  //     if (res) {
  //       var options = {
  //         mediaType: 'photo', //to allow only photo to select ...no video
  //         saveToPhotos: true,  //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
  //         includeBase64: false,
  //       };

  //       launchCamera(options, (res) => {
  //         console.log('Response = ', res);

  //         if (res.didCancel) {
  //           console.log('User cancelled image picker');
  //         } else if (res.error) {
  //           console.log('ImagePicker Error: ', res.error);
  //         } else if (res.customButton) {
  //           console.log('User tapped custom button: ', res.customButton);
  //           Alert.alert(res.customButton);
  //         } else {
  //           // let source = res;
  //           // var resourcePath1 = source.assets[0].uri;
  //           const source = { uri: res.uri };
  //           console.log('response', JSON.stringify(res));

  //           setState(
  //             {
  //               filePath: res,
  //               fileData: res.data,
  //               fileUri: res.uri,
  //             }
  //           )


  //         }
  //       }
  //       )
  //     }
  //     else {
  //       Alert.alert("Camera permission not given")
  //     }
  //   })

  // }


  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const isFocused = useIsFocused()

  const storedLocation = {
    "latitude": 22.7526657,
    "longitude": 75.8654512
  }



  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: "App Camera Permission",
  //         message:"App needs access to your camera ",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     console.log('granted', granted);
  //     if (granted === 'granted') {
  //       console.log('You can use Geolocation');
  //       return true;
  //     } else {
  //       console.log('You cannot use Geolocation');
  //       return false;
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  }



  const onClick = async () => {
    try {
      const grantedcamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      const grantedstorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED && grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera & storage permission given");
        return true
      }
      else {
        console.log("Camera & storage permission  not given");
        return false
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position, "current position");
            setLocation(position);
            setCurrent_lat(position?.coords?.latitude)
            setCurrent_long(position?.coords?.longitude)
            setTimeout(() => {

              
              const currentLocation = { latitude: position?.coords?.latitude, longitude: position?.coords?.longitude };
              const distance = geolib.getDistance(currentLocation, staticLocation);
              console.log(staticLocation , currentLocation , "postion cordinates=====================>>>>>>>>>")
              const maxDistanceThreshold = 500;
            //   if (distance <= maxDistanceThreshold) {
            //     setModalVisible(false)
            //     Alert.alert("Location Matched Successfully")
            //   } else {
            //          setModalVisible(false)
            //       Alert.alert("You are not at the location")
            //  props.navigation.navigate("Home")
            // }
            setModalVisible(false)
          }, 1000)

          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log(location);



  };

  useEffect(() => {
    getLocation()
  }, [])
  return (
    <View style={{ backgroundColor: "#fff", height: hp("100%") }}>

      <HeaderComponent props={props} />
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: hp("4%") }}>
          <Text style={{ color: "black", fontSize: 20, fontWeight: "400" }}>Shivagi Nagar : SM1789</Text>
        </View>
        <View style={{ marginTop: hp("4%"), paddingHorizontal: hp("4%") }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "400" }}>Due Time</Text>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "400" }}>10:30 am</Text>
            <Text></Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp("4%") }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "400" }}>Location</Text>
            <Text style={{ color: "green", fontSize: 14, fontWeight: "bold" }}>Approved</Text>
            <Text></Text>
          </View>
          <View style={{ justifyContent: "space-between", marginTop: hp("4%") }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "400" }}>Status</Text>

            <TextInput
              style={{ borderWidth: 1, color: 'black', borderColor: "black", marginTop: 10 }} />
            {/* <View style={{ height: hp("4%"), width: wp("40%"), borderWidth: 1, borderColor: "black" }}></View> */}
            <Text></Text>
          </View>
          <View style={{ justifyContent: "space-between", marginTop: hp("4%") }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "400" }}>Remark</Text>

            <TextInput
              style={{ borderWidth: 1, borderColor: "black", color: "#000", marginTop: 10 }}
              placeholder='Add remark'
              placeholderTextColor={"grey"} />
            {/* <View style={{ height: hp("4%"), width: wp("40%"), borderWidth: 1, borderColor: "black" }}></View> */}
            <Text></Text>
          </View>
        </View>
        {/* <View style={{ marginTop: hp("4%") }}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Upload Photo</Text>
          <View style={{ justifyContent: "space-between", paddingHorizontal: wp("4%"), marginTop: hp("4%") }}>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
              <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage !== ''
                    ? { uri: pickerImage?.filePath?.assets[0]?.uri }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openImagePicker(setPickedImage2)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage2 !== ''
                    ? { uri: pickerImage2?.filePath?.assets[0]?.uri }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>


            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: hp("2%") }}>
              <TouchableOpacity onPress={() => openImagePicker(setPickedImage3)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage3 !== ''
                    ? { uri: pickerImage3?.filePath?.assets[0]?.uri }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openImagePicker(setPickedImage4)}>
                <Image
                  style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
                  source={pickerImage4 !== ''
                    ? { uri: pickerImage4?.filePath?.assets[0]?.uri }
                    : IMAGES.upload_image}
                  resizeMode="contain"></Image>
              </TouchableOpacity>


            </View>
          </View>
        </View> */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("UploadPhotos"  , props)
            }}
            style={styles.buttonUpload}>
            <Text
              style={{
                fontSize: ResponsiveSize(16),
                color: 'white',
                // fontWeight: 'bold',
              }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            props.navigation.navigate("Home")
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <View style={{ flexDirection: "row" }}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={{ color: "black", marginLeft: 5, fontSize: 16, fontWeight: "bold" }}>Loading !</Text>
              </View>
              <Text style={{ color: "black", marginTop: 10, fontWeight: "400" }}>Fetching your Location.Please Wait</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',

  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#000000B0'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: wp("85%"),
    height: hp("20%"),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },

  buttonUpload: {
    // flexDirection: 'row',
    width: '40%',
    height: ResponsiveSize(44),
    borderRadius: ResponsiveSize(22),
    alignItems: 'center',
    marginTop: ResponsiveSize(50),
    backgroundColor: '#1f51e5',
    justifyContent: 'center',
    marginBottom: hp("4%")
  },
});
export default Restroom;