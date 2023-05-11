import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import ProductFormScreen from './../screens/ProductFormScreen';
import ManageProductsScreen from './../screens/ManageProductsScreen';
import ProductsInCategoryScreen from '../screens/ProductsInCategoryScreen';
import ProductScreen from '../screens/ProductScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator()

const AdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown:false}}/>
          <Stack.Screen name="CreateProduct" component={ProductFormScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="Product" component={ProductScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="ManageProducts" component={ManageProductsScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="ProductsInCategory" component={ProductsInCategoryScreen} options={{headerShown: false,}}/>
          <Stack.Screen name="Orders" component={OrdersScreen} options={{headerShown: false,}}/>

    </Stack.Navigator>
  )
}

export default AdminNavigator