import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import IconButton from "./IconButton";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ product, admin }) => {
  const { image, name, price } = product;
  const navigation = useNavigation();


  return (
    <TouchableOpacity
      className="bg-white px-4 py-4 mr-4 w-36 items-center rounded-lg shadow-slate-800 shadow-md"
      onPress={() => {
        navigation.navigate("Product", { product: product, admin: admin });
      }}
    >
      <Image
        source={{ uri: image }}
        className=" aspect-square w-24 mb-2"
      />

      <Text className="text-center text-ellipsis h-9 font-bold">{name}</Text>
        
      <View className="flex-row mt-4 text-start w-full items-center">
        <Text className="font-bold flex-1">R{price}</Text>

       { !admin && ( <IconButton>
          <ShoppingCartIcon size={18} color={"#009B37"} />
        </IconButton>)}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
