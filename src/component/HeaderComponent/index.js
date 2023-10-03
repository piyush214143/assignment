import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';
  import React, {useState , useEffect} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { IMAGES } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';




const HeaderComponent = (props) => {
  const userData = useSelector(state => state)

  const name = userData?.user?.user?.name
  let position  = userData?.user?.user?.position_status

 const vendorName = name?.split(' ');
    return(
<View style={styles.SearchView}>
<View style={styles.profileView}>
  <TouchableOpacity
    >
      <Image
      style={styles.ImageView}
      source={IMAGES.login_logo}
      resizeMode="contain"></Image>
  </TouchableOpacity>
  <Text style={styles.UserNameTextStyle}>
    TMS Application
  </Text>
 
</View>
<View style={{flexDirection:"row" , justifyContent:"space-between" , marginTop:hp("2%")}}>
 <View>
  <Text style={{color:"#fff"}}>
   Welcome {name ? vendorName : null}
  </Text>
  <Text style={styles.statusTextStyle}>
    Log in as {position}
  </Text>
  </View>
  <View style={{flexDirection:"row"}}>
    <Image
      style={styles.NotificationView}
      source={IMAGES.notification_bell}
      resizeMode="contain"></Image>
      <TouchableOpacity 
      onPress={() => {
        props?.props?.navigation?.navigate("Settings")
      }}>
       <Image
      style={styles.DetailView}
      source={IMAGES.detial_image}
      resizeMode="contain"></Image>
      </TouchableOpacity>
  </View>
</View>

</View>
    )
}

const styles = StyleSheet.create({
    SearchView: {
        // marginTop: hp('2%'),
        paddingHorizontal: wp('3%'),
        paddingVertical:hp('2%'),
        backgroundColor: '#1f51e5',
        justifyContent:"space-between",
        borderBottomEndRadius:20,
        borderBottomLeftRadius:20
      
      },
      profileView: {
        flexDirection: 'row',
        alignItems: 'center',

        // justifyContent:"space-between",
        // height:hp("12%"),

    
      },
      ImageView: {
        backgroundColor: 'black',
        borderRadius: hp('4%'),
        height: hp('6%'),
        width: wp('13%'),
       
      },
      NotificationView: {
        // backgroundColor: 'black',
        borderRadius: hp('4%'),
        height: hp('4%'),
        width: wp('8%'),
       
      },
      DetailView: {
        // backgroundColor: 'black',
        borderRadius: hp('4%'),
        height: hp('2.5%'),
        width: wp('7%'),
        marginLeft:5
       
      },
      LeftImageView: {
        // backgroundColor: 'black',
        // borderRadius: hp('4%'),
        height: hp('3%'),
        width: wp('8%'),
      },
      UserNameTextStyle: {
        marginLeft: wp('3%'), 
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: '#fff',
      },
      statusTextStyle: { 
        // fontSize: hp('1.5%'),
        marginTop:10,
        fontWeight: 'bold',
        color: '#fff',
      },
      SearchMargin: {
        // marginTop: hp("2%"),
        // flexDirection: "row"
        paddingRight: wp('2%'),
      },
    
})

export default HeaderComponent ; 
