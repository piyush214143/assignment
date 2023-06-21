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
    FlatList
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
import PieChart from 'react-native-pie-chart'

const Home = props => {
    const [show, setShow] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const widthAndHeight = 180
    const series = [140, 321, 80]
    const sliceColor = ['orange', '#1f51e5', '#ffffff']
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
      
      ];
      const ImageData = () => {
        return (
          <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Restroom")
          }}
            style={styles.ImageDataStyle}>
            <View>
            <Text style={{color:'black' , fontSize:15 , fontWeight:"bold"}}>Shivagi Nagar</Text>
            <Text style={{color:"black" , fontSize:13}}>
                5N1799
              </Text>
            </View>
         
            <View>
             <Text style={{color:'black' , fontSize:15 , fontWeight:"bold"}}>Due Time</Text>
             <Text style={{color:"black" , fontSize:13}}>
                10:30 am
              </Text>
            </View>
          </TouchableOpacity>
        );
      };

    return (
        <View style={{backgroundColor:"#ffffff" , height:hp("100%")}}>
            <HeaderComponent />

           
                <Text style={{color:"black" , textAlign:"center" , marginTop:hp("4%") , fontSize:20 , fontWeight:"bold"}}>Today's Work : 02052300 </Text>
            
            <View style={styles.container}>
                <Text style={styles.title}>{"88%"}</Text>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.7}
                // coverFill={'#FFF'}

                />
            </View>
            <View style={{ flexDirection: "row" , justifyContent:"space-between" , paddingHorizontal:wp("10%")  , marginTop:hp("4%")}}>
                <View style={{ flexDirection: "row" , alignItems:"center"  ,  }}>
                    <TouchableOpacity style={{ backgroundColor: "#1F51E5", height: hp("2%"), width: wp("4%"), borderRadius: hp("4%") }}></TouchableOpacity>
                    <Text style={{ color: "#000", fontSize: 15, fontFamily: "BOLD",  marginLeft:wp("4%")}}>Completed</Text>
                </View>
                <View style={{ flexDirection: "row" , alignItems:"center" }}>
                    <TouchableOpacity style={{ backgroundColor: "orange", height: hp("2%"), width: wp("4%"), borderRadius: hp("4%") }}></TouchableOpacity>
                    <Text style={{ color: "#000", fontSize: 15, fontFamily: "BOLD" , marginLeft:wp("4%")}}>LateMark</Text>
                </View>
            </View>
          
            <FlatList
            data={data}
            renderItem={ImageData}
            showsVerticalScrollIndicator={false}
            style={{padding:hp("2%")}}
          />
        
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
        paddingTop: hp("5%")
    },
    title: {
        fontSize: 30,
        margin: 10,
        color: "#1F51E5",
        position: "absolute",
        top: 100

    },

    button: {
        // flexDirection: 'row',
        width: '50%',
        height: ResponsiveSize(54),
        borderRadius: ResponsiveSize(8),
        alignItems: 'center',
        marginTop: ResponsiveSize(50),
        backgroundColor: '#1f51e5',
        justifyContent: 'center',
    },
    ImageDataStyle: {
        backgroundColor: '#f8f8ff',
        height: hp('12%'),
        padding: 15,
        marginTop: 10,
        borderRadius:hp("4%") ,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent:"space-between"
      
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
        backgroundColor: 'black',
        borderRadius: hp('1%'),
        height: hp('6%'),
        width: wp('13%'),
      },
});

export default Home;
