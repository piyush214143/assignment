import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Home from '../../screens/Home';
import Restroom from '../../screens/Restroom';
import Notification from '../../screens/Notification';



const RootStack = () => {
  const Stack = createNativeStackNavigator();


  

  return (
         <Stack.Navigator
            screenOptions={{headerShown: false}} >
          
  
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Restroom" component={Restroom} />
      <Stack.Screen name="Notification" component={Notification} />
     
    </Stack.Navigator>
  );
};




export default RootStack;
