import { View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import { RandString } from "../config";
import { useAddToCartMutation, useRemoveFromCartMutation } from "../redux/CartSlice";
import { useSelector } from "react-redux";

const CartItemCard = ({ cartItem }) => {

  const { product, quantity } = cartItem;

  const [incQty, incQtyOpts] = useAddToCartMutation();
  const [decQty, decQtyOpts] = useRemoveFromCartMutation();

  const user = useSelector(state => state.authUser.user);

  const body = {
    "customer_id": user._id ?? "644ee31156239445331cd710",
    "product_id": product._id,
    "quantity": quantity,
  }


  return (
    <View className="bg-white shadow-lg shadow-gray-500 p-4 h-24 rounded-lg flex-row items-center justify-between flex-1">
      {/* LEFT */}
      <View className="flex-1 mr-4">
        <View className="flex-row items-start space-x-2">
          <Image
            source={{
              uri: product.image,
            }}
            className="aspect-square h-full bg-white"
          />
          <View className=" relative h-full" style={{maxWidth: 200}}>
            <Text className="font-semibold overflow-auto">{product.name}</Text>

            <View className="absolute bottom-0">
            <View className="bg-green-200 rounded-lg flex-row justify-around px-1 py-0.5 w-20 ">
              <TouchableOpacity onPress={() => {decQty(body)}}>
                <Text className="font-bold text-sm">-</Text>
              </TouchableOpacity>
              <Text className="font-bold  text-sm text-primary">
                {quantity < 10 ? `0${quantity}` : quantity}
              </Text>
              <TouchableOpacity onPress={async () => { await incQty(body).unwrap().catch((error) => {
                if(error.originalStatus == 200){
                  ToastAndroid.show("added", ToastAndroid.SHORT);
                }else {
                  console.log("Error: " + JSON.stringify(error))
                }
              })}}>
                <Text className="font-bold  text-sm text-primary">+</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      </View>
      {/* RIGHT */}
      <Text className="self-end font-semibold">
        {RandString.format(product?.price * quantity)}
      </Text>
      <View></View>
    </View>
  );
};

export default CartItemCard;
