import { View, Text, Image } from 'react-native'
import React from 'react'
import { ChevronDownIcon, ShoppingBagIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';

const Header = () => {

  const navigation = useNavigation();

  const user = useSelector(state => state.authUser.user);

  useEffect(() => {
    
    console.log(user)
  
  
  }, [])
  

  const {image, address} = user;


  return (
    <View className="flex-row items-center mb-4">
      <View className="flex-1 flex-row items-center space-x-2">
      <TouchableOpacity
      onPress={() => {
        navigation.navigate("Profile")
      }}
      >
      <Image
        resizeMode='cover'
        source={{uri: image}}
        className="h-10 w-10 rounded-full bg-gray-500"
        />
      </TouchableOpacity>
        <View className="">
            <Text className="text-lg font-bold">Delivery</Text>
            <View className="flex-row items-center space-x-1">
            <Text className="text-xs text-gray-500" >{address?.suburb}, {address?.city}</Text>
            <ChevronDownIcon size={14} color="#009B37" /> 
            </View>
        </View>
      </View>
        <View>
         <TouchableOpacity
            className=""
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <View className="relative">
              <View className="absolute aspect-square h-3 bg-primary rounded-full -top-0.5 right-0"></View>
              <ShoppingBagIcon size={24} color={"black"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default Header