import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import DashOrderCard from './DashOrderCard'
import * as Animatable from 'react-native-animatable'
import ProgressIndicator from './ProgressIndicator'
import { ShoppingCartIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { API_URL } from '../config'
import { TouchableOpacity } from 'react-native';

const DashOrdersList = () => {

  // Get All Orders
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation();

  const getNewOrders = async () => {
    try {
     setLoading(true);
     
     const res = await fetch(`${API_URL}/orders/preparing`);
     const result = await res.json();

     
     setLoading(false);
     if(res.ok){
       console.log(result);
        result.sort((a,b) => a.date < b.date);
         setOrders(result);
     }else {
         ToastAndroid.show(result.message, ToastAndroid.SHORT);
     }
    } catch (error) {
      console.log(error)
      ToastAndroid.show("Network error, please try again later", ToastAndroid.SHORT);
    }
    setLoading(false)
 }

 useEffect(() => {
   getNewOrders();
 
   
 }, [navigation])
 

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold">Orders</Text>
      
      <TouchableOpacity onPress={()=>{navigation.navigate("Orders")}}>
      <Text Text className="text-primary text-sm">Manage Orders</Text>
      </TouchableOpacity>

      </View>
    
      {/* Show loader when loading is true */}
    
      {/* {loading && (
        <Animatable.View 
          animation="slideInRight"
          iterationCount={1}
          delay={2}
        >
          <ProgressIndicator />
        </Animatable.View>
      )} */}

      {orders.length == 0 ? (
        <View className="border-gray-200 border-2 rounded-lg w-full h-32 items-center justify-center">
            <ShoppingCartIcon color={"gray"} />
            <Text className="text-gray-500 mt-2">No orders available yet.</Text>
        </View>
      ): (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            {
                orders.map((order,idx) => <DashOrderCard 
                key={idx}
                order={order}
                isAdmin={true}
                />)
            }
      </ScrollView>
      )}

    </View>
  )
}

export default DashOrdersList