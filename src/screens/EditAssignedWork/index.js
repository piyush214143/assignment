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
    TextInput,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeList, getLocation, getUserInfo, updateAssignedWork, workAssign } from '../../slice/ApiCalling';
import { useIsFocused } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditAssignWork = props => {
    console.log("object   od fffff"  , props?.route?.params)
    const [employee, setEmployee] = useState(null);
    const [restroom_id, setRestroom_id] = useState(null);
    const [due_time, setDue_time] = useState(props?.route?.params?.due_time);
    const [isEnabled, setIsEnabled] = useState(false);
    const [userData, setUserData] = useState(null);
    const [employeeList , setEmployeeList]  = useState([]);
    const [locationData , setLocationData]  = useState([]);
    const [latitude , setLatitude]  = useState([]);
    const [longitude , setLongitude]  = useState([]);
    const [value , setValue]  = useState(null);
    const [employeeID , setEmployeeID]  = useState(null)
    const [restroom , setRestroom]  = useState(props?.route?.params?.restroom_id);
    const dispatch = useDispatch() ; 
    const assignID = props?.route?.params?.assign_id
    const widthAndHeight = 180
    const series = [140, 321, 80]
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const sliceColor = ['orange', '#1f51e5', '#ffffff']
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
const isFocused = useIsFocused()

const employee_ID = useSelector(state => state)

const userId = employee_ID?.user?.user?.user_id
    const getUserDetail = async() => {
 let value = await AsyncStorage.getItem("userDetail")
 let data = JSON.parse(value)
 setUserData(data)
    }

    const getUserLocation = () => {
        dispatch(getLocation()).then(result => {
            if (result?.payload){
                let data = result?.payload?.map((item , index) => item)
                setLocationData(data)
                
            }
             
            
          });
    }
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setShowPicker(false)
      setDue_time(moment(currentDate).format("HH:mm:ss"))
  
    };
  
    const showDateTimePicker = () => {
      setShowPicker(true);
    };
    
    const getUserList = async () => {
        console.log("console 1")
        dispatch(getEmployeeList(userId)).then(result => {
            console.log("result recieved==== user dar4dkdkdk", result)
            if (result?.payload) {
          
              setEmployeeList(result?.payload)
            }
          });
      }
    
      useEffect(() => {
        getUserList()
        getUserLocation()
      }, [isFocused])



    useEffect(() => {
getUserDetail()
    }, [])
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
    const presentDate = moment(new Date()).format('l');
    console.log("present date is " , presentDate)

    const assignWork = ()  => {

         let currentDate = new Date()
        const EmployeeDetail = JSON.stringify({
            date: currentDate,
            employee_name : props?.route?.params?.employee_name,
            restroom_id: restroom,
            emp_task_id: employeeID,
            position_status: "employee",
            remark: null,
            due_time: due_time,
            late_mark: null,
            status: false,
            lat_details: latitude,
            long_details: longitude
    })
console.log("new data kfkdfjkdjf"  , EmployeeDetail  , assignID)
    dispatch(updateAssignedWork({EmployeeDetail , assignID})).then(result => {
        console.log("result recieved=== for employee task assign===", result)
        if (result?.type === "updateAssignedWork/fulfilled") {
        //   setLoading(false);
          Alert.alert(result?.payload)
          props.navigation.navigate("AssignedTask")
        } else {
        //   setLoading(false);
         Alert.alert(result?.payload)
        }
      });
    }
    const ImageData = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("Restroom")
                }}
                style={styles.ImageDataStyle}>
                <View>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold" }}>Shivagi Nagar</Text>
                    <Text style={{ color: "black", fontSize: 13 }}>
                        5N1799
                    </Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold" }}>Due Time</Text>
                    <Text style={{ color: "black", fontSize: 13 }}>
                        10:30 am
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ backgroundColor: "#ffffff", height: hp("100%") }}>
            <HeaderComponent props={props} />
            <Text style={{ color: "black", textAlign: "center", marginTop: hp("4%"), fontSize: 20, fontWeight: "bold" }}>Edit Assign Work</Text>
            <View style={{paddingHorizontal:20 , marginTop:20}}>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center" }}>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Date :</Text>
                <Text style={{color:"black" , fontWeight:"bold" , textAlign:"center",  fontSize:16}}>{presentDate}</Text>
            </View>
            <View style={{justifyContent:"space-between" , flexDirection:"row"  , marginTop:10 , flexDirection:"row" , alignItems:"center"}}>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Employee :</Text>
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>{props?.route?.params?.employee_name}</Text>

       
            </View>
    

 

            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
                <Text style={{color:"black" , fontWeight:"bold" , marginTop:10, fontSize:16}}>Restroom ID :</Text>
            </View>
            <View style={styles.dropdowncontainer}>
      {/* {renderLabel()} */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{color:"black"}}
        iconStyle={styles.iconStyle}
        data={locationData}
        search
        maxHeight={300}
        labelField="location_name"
        valueField="location_name"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={restroom}
        onChange={item => {
          setRestroom(item?.location_name);
          setLatitude(item?.lat_detalis);
          setLongitude(item?.long_detalis)
        }}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}
      />
    </View>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
           
                <Text style={{color:"black" , fontWeight:"bold" , fontSize:16}}>Due Time :</Text>
                <TouchableOpacity 
                onPress={showDateTimePicker}style={{width: wp("40%"), borderWidth: 1,color:"black" , borderColor: "black",paddingVertical:-20, marginTop:20 }}>
<Text style={{color:"black" , textAlign:"center"}}>{due_time}</Text>
                </TouchableOpacity>
                {/* <TextInput
                placeholder='Select Time'
                placeholderTextColor={"grey"}
                value={due_time}
                onChangeText={setDue_time}
                  style={{width: wp("40%"), borderWidth: 1,color:"black" , borderColor: "black",paddingVertical:-20, marginTop:20 }}/> */}
            </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        // props.navigation.navigate("EmployeeList*)
                        assignWork()
                    }} 
                    style={styles.button}>
                    <Text
                        style={{
                            fontSize: ResponsiveSize(16),
                            color: 'white',
                            // fontWeight: 'bold',
                        }}>
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
            {showPicker && (
            <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time" // You can also use "date" or "time" to show only date or time picker.
          is24Hour={true} // Set this to false for a 12-hour format
          display="default" // You can use "default", "spinner", "calendar", "clock" on Android
          onChange={onChange}
        />
            )}
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
    dropdowncontainer: {
        alignItems: 'center',
        marginTop:10
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
        height: hp('12%'),
        padding: 15,
        marginTop: 10,
        borderRadius: hp("4%"),
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
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width:wp("80%"),
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color:"#000"
      },
      placeholderStyle: {
        fontSize: 16,
        color:"black"
      },
      selectedTextStyle: {
        fontSize: 16,
        color:"black"
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color:"black"
      },
});

export default EditAssignWork;
