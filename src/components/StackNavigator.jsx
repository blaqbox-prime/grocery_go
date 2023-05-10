import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from './../screens/ProductScreen';
import PaymentScreen from './../screens/PaymentScreen';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import DashboardScreen from './../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileDetailsScreen from './../screens/ProfileDetailsScreen';
import SuccessScreen from '../screens/SuccessScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProductsInCategoryScreen from '../screens/ProductsInCategoryScreen';
import ShoppingListsScreen from '../screens/ShoppingListsScreen';
import MyOrderSceren from './../screens/MyOrderScreen';
import EditProfileScreen from '../screens/EditProfileScreen';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    
    <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="Product" component={ProductScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="Checkout" component={PaymentScreen}options={{headerShown: false,}} />
          <Stack.Screen name="Products" component={ProductListScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="ProductsInCategory" component={ProductsInCategoryScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="Cart" component={CartScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="MyOrders" component={MyOrderSceren} options={{headerShown: false,}}/>
          <Stack.Screen name="ShoppingLists" component={ShoppingListsScreen} options={{headerShown: false,}} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen}  
          options={{
            headerShown: false,
            presentation: "card"
          }}
          />
        </Stack.Navigator> 
  )
}

export default StackNavigator