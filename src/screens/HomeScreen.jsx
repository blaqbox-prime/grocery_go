import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { avatarImage, topSelling } from '../helpers';
import {AdjustmentsHorizontalIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingBagIcon} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
// import Header from '../components/Header';
import Promotions from '../components/Promotions';
import TopSelling from '../components/TopSelling';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../redux/ProductSlice';
import MostReviewedProducts from '../components/MostReviewedProducts';


const HomeScreen = () => {

    const navigation = useNavigation();
    
    const user = useSelector(state => state.authUser.user);

    const {data, status, isLoading} = useGetProductsQuery();
  
    useEffect(() => {
      
      console.log(user)
    
    
    }, [])
    
    const {image, address} = user;

  return (
    <SafeAreaView className="pt-8 px-4 bg-white h-full">
      {/* HEADER */}
    
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
            <Text className="text-lg font-bold">{user.firstName}</Text>
            <View className="flex-row items-center space-x-1">
            <Text className="text-xs text-gray-500" >{address?.suburb}, {address?.city}</Text>
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


      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SEARCH BOX */}

        {/* Categories */}

        <Categories />

        {/* Promotions */}

        <Promotions />

        <MostReviewedProducts />

        {/* Top Selling */}

        <TopSelling />

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen