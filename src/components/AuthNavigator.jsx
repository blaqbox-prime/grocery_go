import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  return (
    <Stack.Navigator initialRouteName='Signin'>
      <Stack.Screen name="Signin" component={SignInScreen} options={{headerShown: false,}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false,}}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator