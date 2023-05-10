import { View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import IconButton from "./IconButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "../redux/CartSlice";

const ProductCard = ({ product, admin }) => {
  const { image, name, price } = product;
  const navigation = useNavigation();

  const [addToCart, { isLoading, error }] = useAddToCartMutation();

  const user = useSelector((state) => state.authUser.user);

  const dispatch = useDispatch()

  const body = {
    "customer_id": user?._id,
    "product_id": product._id,
    "quantity": 1,
  }

  const onAddToCart = () => {
    addToCart(body)
      .unwrap()
      .then((payload) => {
        ToastAndroid.show('Added to Cart!', ToastAndroid.SHORT);
        navigation.navigate("Cart");
      })
      .catch((err) => {
        if(err.originalStatus == 200){
          ToastAndroid.show('Added to Cart!', ToastAndroid.SHORT);
          navigation.navigate("Cart");
        }
      });
  };


  return (
    <TouchableOpacity
      className="bg-white px-4 my-2 py-4 mr-4 w-36 items-center rounded-lg  shadow-sm"
      onPress={() => {
        navigation.navigate("Product", { product: product, admin: admin });
      }}
    >
      <Image
        source={{ uri: image }}
        className=" aspect-square w-24 mb-2"
      />

      <Text className="text-center text-ellipsis h-8 font-bold">{name}</Text>
        
      <View className="flex-row mt-4 text-start w-full items-center">
        <Text className="font-bold flex-1">R{price}</Text>

       { !admin && ( <IconButton onPress={onAddToCart}>
          <ShoppingCartIcon size={18} color={"#009B37"} />
        </IconButton>)}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
