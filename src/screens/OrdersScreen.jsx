import { View, Text, SafeAreaView, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config';
import ProgressIndicator from '../components/ProgressIndicator';
import { TouchableOpacity } from 'react-native';
import DashOrderCard from '../components/DashOrderCard';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const OrdersScreen = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/orders/`);
    const data = await res.json();

    setLoading(false);
    if (res.status == 200) {
      data.sort((a,b) => Date.parse(a.date) < Date.parse(b.date))
      setOrders(data);
      // console.log(data);
    } else {
      console.log(data);
    }
  };


  // include navigation
  const navigation = useNavigation();


  useEffect(() => {
   getOrders();
  }, [])
  

  return (
    <SafeAreaView className="p-4 bg-white h-full">

      <View className="flex-row items-center justify-between my-2">

      <TouchableOpacity
            className=""
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color={"black"} />
          </TouchableOpacity>

          <Text className="text-lg font-medium">Orders</Text>

          <View className="aspect-square w-5"></View>

      </View>


      {/* LIST ALL OF THE ORDERS */}
      {(loading && orders.length == 0) ? (
        <View className="items-center justify-center my-4">
          <ProgressIndicator />
        </View>
      ) : (
        <ScrollView className="space-y-2 flex-1">
          {orders.length === 0 && <Text className="p-4 mx-auto text-center text-lg font-medium text-gray-400">No orders here yet.</Text>}
          {
            orders.map((order) => <DashOrderCard key={order.id} order={order} isAdmin={true} callback={getOrders} />)
          }
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default OrdersScreen