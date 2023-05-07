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
            orders.map((order) => {
              return (
                <View className="shadow-gray-400 bg-white shadow my-4 rounded-lg border border-gray-200" >
                  {/* Status */}
                  <View>
                  <View
            className={`
            mb-4
            ${
              order.deliveryStatus == "Completed"
                ? "bg-primary"
                : order.deliveryStatus == "Ready"
                ? "bg-blue-500"
                : order.deliveryStatus == "Preparing"
                ? "bg-fuchsia-500"
                : order.deliveryStatus == "Shipping"
                ? "bg-yellow-500"
                : "bg-orange-500"
            } justify-center px-2 text-center`}
          >
            <Text className={`text-sm font-medium text-white`}>
              {order.deliveryStatus}
            </Text>
          </View>
                  </View>
                  {/* order id */}
                  <View className="flex-row items-center p-2 justify-between border-b-2 border-gray-100 mb-1"> 
                    <Text>Order ID</Text>
                    <Text>#{order.id}</Text>
                  </View>
                  {/* order list items count */}
                  <View className="flex-row items-center p-2 justify-between border-b-2 border-gray-100 mb-1"> 
                    <Text>Order List</Text>
                    <Text>2</Text>
                  </View>
                  {/* order total */}
                  <View className="flex-row items-center p-2 justify-between border-b-2 border-gray-100 mb-1"> 
                    <Text>Total Bill</Text>
                    <Text>{RandString.format(order.total)}</Text>
                  </View>
                  {/* view order status */}
                  <PrimaryButton title={"Track Order"} onPress={() => {}}/>
                </View>
              );
            })
          }
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyOrderSceren;
