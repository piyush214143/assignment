/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 */

import React, { useRef, useState, useEffect } from 'react';
import { validateNumber  , isObjectEmpty , Error} from '../../utils/validation';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Alert,
    Switch
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
import LoginHeaderComponent from '../../component/LoginHeaderComponent';

const Login = props => {
    const [show, setShow] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [errors, setErrors] = useState({});
    const [temp, setTemp] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onLogin = () => {
        const isValid = validate();
        if (isValid) {
          // if textinput field matched with regex and condition
          props.navigation.navigate('Home');
        }
      };

      

    const validate = () => {
        setTemp(!temp);
    
        if (mobileNumber?.length <= 0) {
          errors['mobileNumber'] = Error.mobileEmpty;
          setErrors(errors);
          // validate mobileNumber <=0  and cannot be empty
        } else if (!validateNumber(mobileNumber)) {
          errors['mobileNumber'] = Error.mobileValidate;
          setErrors(errors);
          // validate if mobileNumber not matching with regex
        } else {
          delete errors?.mobileNumber;
          setErrors(errors);
          // remove error if mobileNumber field is >0 and match with regex
        }
        if (password?.length <= 0) {
          errors['password'] = Error.passwordEmpty;
          setErrors(errors);
          // validate password <=0  and cannot be empty
        } else {
          delete errors?.password;
          setErrors(errors);
        }
        // remove error if password field is >0 and match with regex
        return isObjectEmpty(errors);
      };
      const usePreviousMobile = value => {
        //callback with usestate if field is taking automatically space
        const ref = useRef();
        // useRef is used for reference
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      };
    
      const prevMobile = usePreviousMobile(mobileNumber);
    
      const usePreviousPassword = value => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      };
    
      async function logJSONData() {
        const response = await fetch('http://example.com/movies.json');
        const jsonData = await response.json();
        console.log(jsonData);
      }
    
      const prevPassword = usePreviousPassword(password);
    
      useEffect(() => {
        if (prevMobile <= mobileNumber) {
          validate(mobileNumber);
        }
        if (prevPassword <= password) {
          validate(password);
        }
      }, [mobileNumber, password]);
    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: "#fff" }}>
            <LoginHeaderComponent/>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: hp("10%") }}>
                <Image
                    style={{ height: hp("30%"), width: wp("80%") }}
                    source={IMAGES.login_image}
                    resizeMode="contain"></Image>

            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <InputText
                    LeftImage={IMAGES.employee_id}
                    placeholder="Employee ID"
                    keyboardType="numeric"
                    value={mobileNumber}
                    error={errors?.mobileNumber?.length > 0 ? true : false}
                    onChangeText={value => {
                        setMobileNumber(value);
                        validate();
                        
                    }}

                />
                 {errors?.mobileNumber?.length > 0 && (
          <Text style={{color: '#A6192E', padding: 3}}>
            {errors?.mobileNumber}
          </Text>
        )}


                <View>
                    <InputText
                        LeftImage={IMAGES.password_lock}
                        placeholder="Password"
                        value={password}
                        onChangeText={value => {
                            setPassword(value);
                            validate();
                        }}
                        rightIcon={true}
                        onRightIconPressed={() => {
                            setShow(!show);
                        }}
                        secureTextEntry={show}></InputText>

{errors?.password?.length > 0 && (
            <Text style={{color: '#A6192E', padding: 3}}>
              {errors?.password}
            </Text>
          )}

                </View>




            </View>
            <View style={{flexDirection:"row" , justifyContent:"space-between" , marginTop:hp("2%") , paddingHorizontal:wp("4.5%")}}>
                <View>
                    <View style={{flexDirection:"row" , alignItems:"center"}}>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={{
                            fontSize: 14,
                            color: '#22215B',
                            fontWeight: '500',
                        }}>Remember Me</Text>
                    </View>
                </View>
                <TouchableOpacity

                    style={{
                        paddingTop: ResponsiveSize(10),
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#22215B',
                            fontWeight: '500',
                        }}>
                        Forgot Password?
                    </Text>

                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                    onPress={onLogin} 
                    style={styles.button}>
                    <Text
                        style={{
                            fontSize: ResponsiveSize(16),
                            color: 'white',
                            // fontWeight: 'bold',
                        }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>


        </KeyboardAwareScrollView>
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
});

export default Login;
