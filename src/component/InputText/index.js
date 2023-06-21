/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {IMAGES} from '../../assets';
import { ResponsiveSize } from '../../utils/ResponsiveSize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowWidth);
console.log(windowHeight);

const InputText = props => {
  console.log(props.error, 'props error');
  const renderRightIcon = () => {
    return (
      <>
        {props.rightIcon ? (
          <TouchableOpacity
            onPress={props.onRightIconPressed}
            // disabled={props.show ? true : false}
            style={styles.eyeContainer}>
            <Image
              source={props.secureTextEntry ? IMAGES.hide_eye : IMAGES.show_eye}
              style={[styles.eyeImage]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : props.rightText ? (
          <TouchableOpacity
            onPress={props.onRightPress}
            // disabled={props.show ? true : false}
            style={styles.getOtpButton}>
            <Text style={{color: '#22215B'}}>{props?.rightTextValue}</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  const renderLeftIcon = () => {
    return (
      <View style={styles.viewContainer}>
        <Image
          source={props.LeftImage}
          style={
            props.iconstyle
              ? {
                  width: ResponsiveSize(20),
                  height: ResponsiveSize(20),
                  backgroundColor: '#F5F7F9',
                  marginLeft: ResponsiveSize(10),
                }
              : {
                  width: ResponsiveSize(30),  
                  height: ResponsiveSize(30), 
                  backgroundColor: '#F5F7F9', 
                  marginLeft: ResponsiveSize(5),
                }
          }
        />
      </View>
    );
  };
  return (
    <View>
      <View style={styles.Container}>
        {renderLeftIcon()}
        <TextInput
          right={<TextInput.Icon name="eye" />}
          placeholderTextColor="#D1D1D1"
          activeUnderlineColor="transparent"
          underlineColor="transparent"
          textColor="black"
          selectionColor='grey'
          underlineColorAndroid="transparent"
          error={props?.error}
          style={[
            props.style,
            {
              height: ResponsiveSize(56),
              width: '100%',
              paddingLeft: ResponsiveSize(25),
              outlineStyle: 'none',
              backgroundColor: '#F5F7F9',
              borderRadius: ResponsiveSize(6),
              fontSize: ResponsiveSize(14),
              fontFamily:"Raleway",
            },
          ]}
          {...props}
          placeholder={props.placeholder}></TextInput>

        {renderRightIcon()}
      </View>
      {props.isError && (
        <Text style={{color: '#ef6c3e', padding: 2}}>{props.errorMessage}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    // width: ResponsiveSize(385),
    height: ResponsiveSize(50),
    backgroundColor: '#F5F7F9',
    borderRadius: ResponsiveSize(8),
    // borderWidth: ResponsiveSize(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F5F7F9',
    marginTop: ResponsiveSize(20),
  },
  viewContainer: {
    position: 'absolute',
    zIndex: ResponsiveSize(10),
    alignItems: 'flex-start',
    left: ResponsiveSize(0),
  },

  welcomeBack: {
    color: '#e4e4e4',
    textAlign: 'center',
    justifyContent: 'center',
  },
  loginAcc: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    width: '90%',
    height: ResponsiveSize(40),
    marginHorizontal: '5%',
    borderRadius: ResponsiveSize(4),
    alignItems: 'center',
    marginTop: ResponsiveSize(50),
    backgroundColor: '#22215b',
    bottom: ResponsiveSize(30),
    justifyContent: 'center',
  },
  eyeImage: {
    height: ResponsiveSize(30),
    width: ResponsiveSize(30),
    marginBottom: 30,
    // backgroundColor: 'red',
  },
  eyeImage: {
    height: ResponsiveSize(20),
    width: ResponsiveSize(30),
    marginBottom: 30,
    // backgroundColor: 'red',
  },
  eyeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: ResponsiveSize(17),
    // left: ResponsiveSize(140),
    right: 14,
  },
  getOtpButton: {
    position: 'absolute',
    justifyContent: 'center',
    width: '20%',

    height: ResponsiveSize(30),
    borderRadius: ResponsiveSize(7),
    backgroundColor: 'white',
    alignItems: 'center',
    top: ResponsiveSize(10),
    // bottom: 27.5,
    right: ResponsiveSize(10),
  },
});

export default InputText;
