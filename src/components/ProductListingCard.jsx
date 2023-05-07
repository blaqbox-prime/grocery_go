import { View, Text, Image, ToastAndroid } from 'react-native'
import React from 'react'
import { RandString } from '../config'
import { TouchableOpacity } from 'react-native'
import { ShoppingCartIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useAddToCartMutation } from '../redux/CartSlice'
import { useSelector } from 'react-redux'

const ProductListingCard = ({product, admin}) => {

    const navigation = useNavigation();
    const [addToCart, { isLoading, error }] = useAddToCartMutation();
    const user = useSelector((state) => state.authUser.user);

    const body = {
      "customer_id": user._id,
      "product_id": product._id,
      "quantity": 1,
    }
  
    const onAddToCart = () => {
      addToCart(body)
        .unwrap()
        .then((payload) => {
          console.log("Fulfilled " + payload);
          navigation.navigate("Cart");
        })
        .catch((err) => ToastAndroid.show("Added to cart", ToastAndroid.SHORT));
    };

    
  return (
    <TouchableOpacity
    onPress={() => {
        if(admin){
          navigation.navigate("CreateProduct",{product: product});
        }else {
          navigation.navigate("Product", { product: product });
        }
      }}
    >
        <View className="relative bg-white shadow-sm shadow-gray-300 p-4 my-2 h-24 rounded-lg flex-row items-center justify-between">
      {/* LEFT */}
      <View className="flex-1 mr-4">
        <View className="flex-row items-start space-x-2">
          <Image
            source={{
              uri: product.image,
            }}
            className="aspect-square h-full bg-white"
          />
          <View className=" relative h-full" style={{maxWidth: 180}}>
            <Text className="font-semibold overflow-auto">{product.name}</Text>
            <Text className="text-sm text-gray-400 overflow-ellipsis" style={{maxHeight:36}}>{product.description}</Text>
          </View>
        </View>
      </View>
      {/* RIGHT */}
      <Text className="self-end font-semibold">
        {RandString.format(product?.price)}
      </Text>
      <View></View>

      {!admin && (<TouchableOpacity className="absolute top-2 right-2 aspect-square rounded-full p-2 bg-green-100 align-middle"
    onPress={() => {
      onAddToCart();
    }}
    >
      <ShoppingCartIcon size={18} color={"#009B37"} />
    </TouchableOpacity>)}

    </View>
    </TouchableOpacity>
  )
}

export default ProductListingCard