import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useClearCartMutation, useGetCartQuery } from "../redux/CartSlice";
import { ScrollView } from "react-native";
import { RandString } from "../config";
import { ArrowLeftIcon, TagIcon, TrashIcon } from "react-native-heroicons/outline";

import CartItemCard from "../components/CartItemCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../redux/OrderSlice";
import Cart from "../components/Cart";


const CartScreen = () => {

  const [isScreenLoading, setScreenLoading] = useState(false);
  // const [data, setCartData] = useState({});
  
  const user = useSelector((state) => state.authUser.user)
  
  console.log("Cart Screen User: " + user_id );
  
  const [clearCart, clearCartOpt] = useClearCartMutation();
  
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    
  }, [])


  // =============================================================

  return isScreenLoading ? (<ActivityIndicator animating={isScreenLoading} />) : (
    <SafeAreaView className="py-6 px-4 h-full w-full bg-white flex-1">
      <View className="flex-row items-center justify-between my-4">
      <TouchableOpacity
            className=""
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={22} color={"black"} />
          </TouchableOpacity>

        <Text className="font-bold text-lg">Shopping Cart</Text>

        <TouchableOpacity
            className=""
            onPress={async () => {
              const res = await clearCart(user._id).unwrap();
            }}
          >
            <TrashIcon size={22} color={"red"} />
          </TouchableOpacity>
      </View>
              <Cart user_id={user._id}/>
    </SafeAreaView>
  );
};y5

export default CartScreen;
