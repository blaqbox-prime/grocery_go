import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ProgressIndicator from "./../components/ProgressIndicator";
import DashOrderCard from "../components/DashOrderCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API_URL } from "../config";
import { RandString } from './../config';
import PrimaryButton from './../components/PrimaryButton';
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const MyOrderSceren = () => {
  const user = useSelector((state) => state.authUser.user);

  // Fetch Orders

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/orders/${user._id}/all`);
    const data = await res.json();

    setLoading(false);
    if (res.status == 200) {
      setOrders(data);
      console.log(data);
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

          <Text className="text-lg font-medium">My Orders</Text>

          <View className="aspect-square w-5"></View>

      </View>


      {/* LIST ALL OF THE USERS ORDERS */}
      {loading ? (
        <View className="items-center justify-center ">
          <ProgressIndicator />
        </View>
      ) : (
        <ScrollView className="space-y-2 flex-1">
          {orders.length === 0 && <Text className="p-4 mx-auto text-center text-lg font-medium text-gray-400">No orders here yet.</Text>}
          {
            orders.map((order) => <DashOrderCard key={order.id} order={order} isAdmin={false} />)
          }
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyOrderSceren;
