import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/rootStack';

const App = () => {
  return(
    <NavigationContainer>
      <RootStack />
</NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default App ;