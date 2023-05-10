import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { ArrowLeftIcon, MagnifyingGlassIcon, ShoppingBagIcon } from 'react-native-heroicons/outline';
import { topSelling } from '../helpers';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import ProductListingCard from '../components/ProductListingCard';
import { useGetProductsQuery } from '../redux/ProductSlice';

const ProductListScreen = () => {


  const navigation = useNavigation();  

    const {data, error, isLoading, status} = useGetProductsQuery()
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);
    

    const debounce = (func, delay) => {
      let timeoutId;
      return function (...args) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };
    
    

    const handleFilterProducts = debounce((searchTerm) => {
      console.log(searchTerm);
    
      if (searchTerm.length > 0) {
        const filteredProducts = data && data.filter((product) => {
          return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFiltered(filteredProducts);
      } else {
        setFiltered([]);
      }
    }, 500);


  return (
    <SafeAreaView className="px-4 py-6 bg-white">
      <View className="flex-row items-center justify-between my-4">
      <TouchableOpacity
            className=""
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={22} color={"black"} />
          </TouchableOpacity>

        <Text className="font-bold text-lg">Products</Text>

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
      <View className="flex-row items-center space-x-2 pb-2 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-100 p-3 items-center rounded-lg">
          <MagnifyingGlassIcon color="#009B37" size={20}/>
          <TextInput
          placeholder="Search for your favorite item"
          keyboardType="default"
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            handleFilterProducts(text)
          }}
          // onChangeText={(text) => handleFilterProducts(text)}
          />
        </View>
      </View>
        <ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>

        
        {
            (filtered.length == 0 && searchTerm > 0) && <Text className="text-lg p-4 text-center">No items match your search</Text> 
          }

          {
           filtered.length > 0 && filtered.map(prod => <ProductListingCard key={prod._id} product={prod} admin={false} />)
          }
        
          {
           filtered.length == 0 && data?.map(prod => <ProductListingCard key={prod._id} product={prod} admin={false} />)
          }

        </ScrollView>
    </SafeAreaView>
  )
}

export default ProductListScreen
