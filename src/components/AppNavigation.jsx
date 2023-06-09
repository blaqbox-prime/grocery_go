import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthNavigator from './AuthNavigator';
import StackNavigator from './StackNavigator';
import AdminNavigator from './AdminNavigator';

const AppNavigation = () => {

    const user = useSelector((state) => state.authUser.user)


  return (
    <SafeAreaProvider>
    <SafeAreaView className="flex-1">
        {user == null ? <AuthNavigator /> : user.role == "admin" ? <AdminNavigator/> : <StackNavigator />}
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AppNavigation