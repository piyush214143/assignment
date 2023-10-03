/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, { useRef, useState, useEffect } from 'react';
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

const Notification = props => {
    const [show, setShow] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const data = [
        {
            title: 'You are running late',
            value: '#f00',
        },
        {
            title: '10 minutes away from the due time',
            value: '#0f0',
        },
        {
            title: 'Your location has been approved',
            value: '#00f',
        },
        {
            title: 'Your location has been approved',
            value: '#00f',
        },


    ];
    const ImageData = ({item}) => {
        return (
            <TouchableOpacity
                // onPress={() => {
                //     props.navigation.navigate("AssignWork")
                // }}
                style={styles.ImageDataStyle}>
                <View>
                    <Text style={{ color: 'black', fontSize: 13, fontWeight: "bold" }}>{item.title}</Text>
                    <Text style={{ color: "black", fontSize: 13 }}>
                        Shivagi Nagar : 5N1799
                    </Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold" }}></Text>
                    <Text style={{ color: "black", fontSize: 13 }}>
                        10:30 am
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (

        <View style={{backgroundColor:"#fff" , height:hp("100%")}}>
            <HeaderComponent />
            <FlatList
                data={data}
                renderItem={ImageData}
                showsVerticalScrollIndicator={false}
                style={{ padding: hp("2%") }}
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
        borderRadius: hp("2%"),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: "space-between"

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

export default Notification;
