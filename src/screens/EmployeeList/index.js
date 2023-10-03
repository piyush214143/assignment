/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, { useRef, Component, useState, useEffect } from 'react';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Switch,
  FlatList,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../component/HeaderComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ResponsiveSize } from '../../utils/ResponsiveSize';
import InputText from '../../component/InputText';
import { IMAGES } from '../../assets';
import PieChart from 'react-native-pie-chart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteEmployee, fetchData, getEmployeeList, getUserInfo } from '../../slice/ApiCalling';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const EmployeeList = props => {
  // const [userData, setUserData] = useState(null)
  const [employeeList, setEmployeeList] = useState(null)
  const dispatch = useDispatch();
  const userData = useSelector(state => state)
  const userInfo = userData?.user?.user?.user_id

  const isFocused = useIsFocused()
console.log("++++++++++++++"  , userInfo)

  const data = [
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
  ];

  const deleteUser = (item) => {

console.log("user iddd recieved" , item)

    dispatch(deleteEmployee(item)).then(result => {
      console.log("delete status =======>>>>>", result)
      if (result?.type === "deleteEmployee/fulfilled") {
       Alert.alert(result?.payload)
       getUserList()
      }else{
        Alert.alert("Unable to delete the User")
      }
      // } else if(result?.payload?.position_status === "employee"){
      //   setLoading(false);
      //   props.navigation.replace("Home");
      // }else{
      //   setLoading(false);
      //   setErrorMessage(result?.payload);
      // }
    });
  }

  const getUserList = async () => {
    dispatch(getEmployeeList(userInfo)).then(result => {
      console.log("result recieved==== user dar4dkdkdk", result)
      if (result?.payload) {
    
        setEmployeeList(result?.payload)
      }
    });
  }

  useEffect(() => {
    getUserList()
  }, [isFocused])
  const ImageData = (data) => {
    console.log("data recieved here====>>>>>>", data)
    return (
      <View style={styles.ImageDataStyle}>
        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
          {data?.item?.name}
        </Text>
        <View style={{flexDirection:"row" , justifyContent:"center" , alignItems:"center"}}>
      <TouchableOpacity 
      onPress={() => {
        props.navigation.navigate("EditEmployee"  , data)
      }}
      >
      <Image
              source={IMAGES.edit_employee}
              style={{height: ResponsiveSize(25),
                width: ResponsiveSize(25) , marginRight:15}}
              resizeMode="contain"
            />
      </TouchableOpacity>
       <TouchableOpacity
        onPress={() => {
          deleteUser(data?.item?.user_id)
         }}
        // onPress={deleteUser(data?.item?.user_id)}
       >
       <Image
              source={IMAGES.delete_employee}
              style={{height: ResponsiveSize(22),
                width: ResponsiveSize(22)}}
              resizeMode="contain"
            />
       </TouchableOpacity>
              
            </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: '#ffffff', height: hp('100%') }}>
      <HeaderComponent  props={props}/>

      <View
        style={{ flexDirection: "row", paddingVertical: 15, alignItems: "center" }}
      >
        <Text
          style={{
            color: 'black',
            // marginTop: hp('4%'),
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: wp("32%")


          }}>
          Employee List
        </Text>
        <TouchableOpacity

          onPress={() => {
            props.navigation.navigate("AddEmployee")
          }}
        >
          <Image
            style={styles.ImageView}
            source={IMAGES.add_employee}
            resizeMode="contain"></Image>
        </TouchableOpacity>
      </View>
      <FlatList
        data={employeeList}
        renderItem={ImageData}
        style={{ paddingHorizontal: 10 }}
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeBack: {
    color: '#848484',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Raleway',
    marginTop: 24,
    fontSize: 16,
  },

  loginAcc: {
    color: '#333333',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    fontSize: 24,
    marginTop: 7,
  },
  container: {
    alignItems: 'center',
    paddingTop: hp('5%'),
  },
  title: {
    fontSize: 30,
    margin: 10,
    color: '#1F51E5',
    position: 'absolute',
    top: 100,
  },

  button: {
    // flexDirection: 'row',
    width: '40%',
    height: ResponsiveSize(50),
    borderRadius: ResponsiveSize(24),
    alignItems: 'center',
    marginTop: ResponsiveSize(50),
    backgroundColor: '#1f51e5',
    justifyContent: 'center',
  },
  ImageDataStyle: {
    backgroundColor: '#f8f8ff',
    // height: hp('7%'),
    padding: 10,
    marginTop: 15,
    borderRadius: hp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'space-between',
  },
  starImageStyle: {
    borderRadius: 5,
    marginLeft: 40,
    height: hp('3%'),
    width: wp('5%'),
  },
  shareImageStyle: {
    borderRadius: 5,
    height: hp('3%'),
    marginLeft: 15,
    width: wp('5%'),
  },
  threeDotImageStyle: {
    borderRadius: 5,
    height: hp('3%'),
    marginLeft: 15,
    width: wp('5%'),
  },
  ImageView: {
    borderRadius: hp('1%'),
    height: hp('5%'),
    width: wp('10%'),
    marginLeft: wp("15%")
  },
});

export default EmployeeList;
