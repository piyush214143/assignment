/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput ,  PermissionsAndroid, ActivityIndicator , Modal ,Pressable ,Image, Location, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import HeaderComponent from '../../component/HeaderComponent';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGES } from '../../assets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ResponsiveSize } from '../../utils/ResponsiveSize';

// import { TextInput } from 'react-native-paper';


const Restroom = (props) => {
    // state to hold location

    const [pickerImage, setPickedImage] = useState('');
    const [pickerImage2, setPickedImage2] = useState('');
    const [pickerImage3, setPickedImage3] = useState('');
    const [pickerImage4, setPickedImage4] = useState('');
    
    const [modalVisible, setModalVisible] = useState(true);

    const openImagePicker = async () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, res => {
          console.log('response 2', pickerImage);
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            // alert(res.customButton);
          } else {
            const source = {uri: res.uri};
            console.log('response', JSON.stringify(res?.assets[0]?.uri));
            setPickedImage({
              filePath: res,
              fileData: res.data,
              fileUri: res.uri,
            });
            
            console.log(
              'response 3',
              JSON.stringify(pickerImage?.filePath?.assets[0]?.uri),
            );
          }
        });
      };
      const openImagePicker2 = async () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, res => {
          console.log('response 2', pickerImage);
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            // alert(res.customButton);
          } else {
            const source = {uri: res.uri};
            console.log('response', JSON.stringify(res?.assets[0]?.uri));
            setPickedImage2({
              filePath: res,
              fileData: res.data,
              fileUri: res.uri,
            });
            
            console.log(
              'response 3',
              JSON.stringify(pickerImage?.filePath?.assets[0]?.uri),
            );
          }
        });
      };
      const openImagePicker3 = async () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, res => {
          console.log('response 2', pickerImage);
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            // alert(res.customButton);
          } else {
            const source = {uri: res.uri};
            console.log('response', JSON.stringify(res?.assets[0]?.uri));
            setPickedImage3({
              filePath: res,
              fileData: res.data,
              fileUri: res.uri,
            });
            
            console.log(
              'response 3',
              JSON.stringify(pickerImage?.filePath?.assets[0]?.uri),
            );
          }
        });
      };
      const openImagePicker4 = async () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, res => {
          console.log('response 2', pickerImage);
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            // alert(res.customButton);
          } else {
            const source = {uri: res.uri};
            console.log('response', JSON.stringify(res?.assets[0]?.uri));
            setPickedImage4({
              filePath: res,
              fileData: res.data,
              fileUri: res.uri,
            });
            
            console.log(
              'response 3',
              JSON.stringify(pickerImage?.filePath?.assets[0]?.uri),
            );
          }
        });
      };


    const [location, setLocation] = useState(null);
    const [show, setShow] = useState(false);
    const isFocused = useIsFocused()

    const storedLocation = {
        "latitude": 22.7526657,
        "longitude": 75.8654512
    }


    const Access = () => {

    }
    // Function to get permission for location
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
    };
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
                        setTimeout(() => {
                            setModalVisible(false)
                            Alert.alert("Your Login cordinates are" + "\n"  +
                            position?.coords?.latitude + "    "  
                            +position?.coords?.longitude )
                          }, 2000)
                        
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
        // if(location !== null ) {
        //     console.log("coordinates" ,  location?.coords?.latitude ,  storedLocation?.latitude)
        //     if(location?.coords?.latitude === storedLocation?.latitude || location?.coords?.longitude === storedLocation?.longitude){
        //         setShow(true)
        //         console.log("location matched")
        //           }

        // }

    }, [isFocused])
    return (
        <View style={{ backgroundColor: "#fff", height: hp("100%") }}>

            <HeaderComponent />
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
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp("4%") }}>
                    <Text style={{ color: "black", fontSize: 14, fontWeight: "400" }}>Status</Text>

                  <TextInput
                  style={{ height: hp("4%"), width: wp("40%"), borderWidth: 1, borderColor: "black" }}/>
                    {/* <View style={{ height: hp("4%"), width: wp("40%"), borderWidth: 1, borderColor: "black" }}></View> */}
                    <Text></Text>
                </View>
            </View>
            <View style={{ marginTop: hp("4%") }}>
                <Text style={{ color: "black", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Upload Photo</Text>
                <View style={{justifyContent:"space-between" , paddingHorizontal:wp("4%") , marginTop:hp("4%")}}>
                <View style={{flexDirection:"row" , justifyContent:"space-evenly"}}>
                <TouchableOpacity onPress={openImagePicker}>
                    <Image
                        style={{ height: hp("20%"), width: wp("40%") , borderWidth:0.1  , borderRadius:10 , borderColor:"grey"}}
                        source={  pickerImage !== ''
                        ? {uri: pickerImage?.filePath?.assets[0]?.uri}
                        : IMAGES.upload_image}
                        resizeMode="contain"></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openImagePicker2}>
                    <Image
                        style={{ height: hp("20%"), width: wp("40%") ,  borderWidth:0.1  , borderRadius:10 ,   borderColor:"grey" }}
                        source={  pickerImage2 !== ''
                        ? {uri: pickerImage2?.filePath?.assets[0]?.uri}
                        : IMAGES.upload_image}
                        resizeMode="contain"></Image>
                        </TouchableOpacity>


                </View>
                <View style={{flexDirection:"row" ,justifyContent:"space-evenly" , marginTop:hp("2%")}}>
                <TouchableOpacity onPress={openImagePicker3}>
                    <Image
                        style={{ height: hp("20%"), width: wp("40%")  , borderWidth:0.1  ,  borderRadius:10 ,  borderColor:"grey" }}
                        source={  pickerImage3 !== ''
                        ? {uri: pickerImage3?.filePath?.assets[0]?.uri}
                        : IMAGES.upload_image}
                        resizeMode="contain"></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openImagePicker4}>
                    <Image
                        style={{ height: hp("20%"), width: wp("40%") ,  borderWidth:0.1  , borderRadius:10 ,  borderColor:"grey"  }}
                        source={  pickerImage4 !== ''
                        ? {uri: pickerImage4?.filePath?.assets[0]?.uri}
                        : IMAGES.upload_image}
                        resizeMode="contain"></Image>
                        </TouchableOpacity>


                </View>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() =>{
                        props.navigation.navigate("Notification")
                    }} 
                    style={styles.buttonUpload}>
                    <Text
                        style={{
                            fontSize: ResponsiveSize(16),
                            color: 'white',
                            // fontWeight: 'bold',
                        }}>
                        Upload
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
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
            <View style={{flexDirection:"row"}}>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text style={{color:"black" , marginLeft:5 ,fontSize:16 , fontWeight:"bold"}}>Loading !</Text>
            </View>
            <Text style={{color:"black" , marginTop:10 , fontWeight:"400"}}>Fetching your Location.Please Wait</Text>
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
        width:wp("85%"),
        height:hp("20%"),
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
        marginBottom:hp("4%")
    },
});
export default Restroom;