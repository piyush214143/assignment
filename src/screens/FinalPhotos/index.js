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
import moment from 'moment';
import { uploadFinalImages, uploadImages } from '../../slice/ApiCalling';
import { useDispatch, useSelector } from 'react-redux';

const FinalPhotos = (props)  => {
  const usedID = useSelector(state => state?.user?.user?.user_id)
  const dispatch = useDispatch()
    const [pickerImage, setPickedImage] = useState('');
    const [remark, setRemark] = useState('');
    const [pickerImage2, setPickedImage2] = useState('');
    const [pickerImage3, setPickedImage3] = useState('');
    const [pickerImage4, setPickedImage4] = useState('');
    const [pickerImage5, setPickedImage5] = useState('');
    const [pickerImage6, setPickedImage6] = useState('');
    const [pickerImage7, setPickedImage7] = useState('');
    const [pickerImage8, setPickedImage8] = useState('');
    const [loading, setLoading] = useState(false);

    const openImagePicker = async (setState) => {
        const result = onClick();
        result.then(res => {
          console.log("reeeeeeeeeeeeeeeeeeeee", res)
          if (res) {
            var options = {
              mediaType: 'photo', //to allow only photo to select ...no video
              saveToPhotos: true,  //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
              includeBase64: false,
            };
    
            launchCamera(options, (res) => {
              console.log('Response = ', res);
    
              if (res.didCancel) {
                console.log('User cancelled image picker');
              } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                Alert.alert(res.customButton);
              } else {
                // let source = res;
                // var resourcePath1 = source.assets[0].uri;
                const source = { uri: res.uri };
                console.log('response', JSON.stringify(res));
    
                setState(res.assets[0])
    
    
              }
            }
            )
          }
          else {
            Alert.alert("Camera permission not given")
          }
        })
    
      }

      const UploadPhotos = async () => {

        setLoading(true)
        const dateToFormat = new Date();
        const formattedDate = moment(dateToFormat).format('YYYY-MM-DD');
        console.log("object", formattedDate)
          console.log("inside the consssssssssss", pickerImage)
          const formData = new FormData();
          formData.append('user_id', usedID);
          formData.append('photo_type', 'After');
          formData.append('created_date', formattedDate);
          formData.append('myImages', {
            uri: pickerImage.uri,
            type: pickerImage.type, // Set the correct MIME type for your image
            name: pickerImage.fileName, // Provide a name for the file
          },
          );
          formData.append('myImages', {
            uri: pickerImage2.uri,
            type: pickerImage2.type, // Set the correct MIME type for your image
            name: pickerImage2.fileName, // Provide a name for the file
          },
          );
          formData.append('myImages', {
            uri: pickerImage3.uri,
            type: pickerImage3.type, // Set the correct MIME type for your image
            name: pickerImage3.fileName, // Provide a name for the file
          },
          );
          formData.append('myImages', {
            uri: pickerImage4.uri,
            type: pickerImage4.type, // Set the correct MIME type for your image
            name: pickerImage4.fileName, // Provide a name for the file
          },
          );
          formData.append('myImages', {
            uri: pickerImage5.uri,
            type: pickerImage5.type, // Set the correct MIME type for your image
            name: pickerImage5.fileName, // Provide a name for the file
          },
          );
          formData.append('myImages', {
            uri: pickerImage6.uri,
            type: pickerImage6.type, // Set the correct MIME type for your image
            name: pickerImage6.fileName, // Provide a name for the file
          },
          );
          formData.append('myImages', {
            uri: pickerImage7.uri,
            type: pickerImage7.type, // Set the correct MIME type for your image
            name: pickerImage7.fileName, // Provide a name for the file
          },
          );
          formData.append('myImages', {
            uri: pickerImage8.uri,
            type: pickerImage8.type, // Set the correct MIME type for your image
            name: pickerImage8.fileName, // Provide a name for the file
          },
          );
          dispatch(uploadFinalImages(formData)).then(result => {
            console.log("result recieved logoin======", result)
            if (result?.payload !== undefined) {
              setLoading(false);
              Alert.alert("Photo uploaded successfully")
              props.navigation.navigate("Notification")
            } else {
              setLoading(false);
              Alert.alert("Error uploading Images")
            }
          });
  
     
  
    };

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
    
return(
    <View style={{ backgroundColor: "#fff", height: hp("100%") }}>
        <HeaderComponent props={props}/>
        <ScrollView>
    <View style={{ marginTop: hp("4%") }}>
  
    <Text style={{ color: "black", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Upload Exit Photos</Text>
    <View style={{ justifyContent: "space-between", paddingHorizontal: wp("4%"), marginTop: hp("4%") }}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage !== ''
              ? { uri: pickerImage?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openImagePicker(setPickedImage2)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage2 !== ''
              ? { uri: pickerImage2?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>


      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" ,marginTop: hp("2%") }}>
        <TouchableOpacity  style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage3)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage3 !== ''
              ? { uri: pickerImage3?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => openImagePicker(setPickedImage4)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage4 !== ''
              ? { uri: pickerImage4?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>


      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: hp("2%") }}>
        <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage5)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage5 !== ''
              ? { uri: pickerImage5?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openImagePicker(setPickedImage6)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage6 !== ''
              ? { uri: pickerImage6?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>


      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: hp("2%") }}>
        <TouchableOpacity style={{ height: hp("15%") }} onPress={() => openImagePicker(setPickedImage7)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage7 !== ''
              ? { uri: pickerImage7?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openImagePicker(setPickedImage8)}>
          <Image
            style={{ height: hp("10%"), width: wp("20%"), borderWidth: 0.1, borderRadius: 10, borderColor: "grey" }}
            source={pickerImage8 !== ''
              ? { uri: pickerImage8?.uri }
              : IMAGES.upload_image}
            resizeMode="contain"></Image>
        </TouchableOpacity>


      </View>
    </View>
    <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
             UploadPhotos()
            }}
            style={styles.buttonUpload}>
            <Text
              style={{
                fontSize: ResponsiveSize(16),
                color: 'white',
                // fontWeight: 'bold',
              }}>
              {loading ? <ActivityIndicator/> : "Proceed"}
            </Text>
          </TouchableOpacity>
        </View>
  </View> 
  </ScrollView>
  </View>
)
}
     
const styles = StyleSheet.create({
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
      }, }) 
export default FinalPhotos;