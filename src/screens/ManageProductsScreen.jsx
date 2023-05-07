import { View, Text, TextInput, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ProductListingCard from '../components/ProductListingCard';
import { ScrollView } from 'react-native';
import { ArrowLeftIcon, MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetProductsQuery } from '../redux/ProductSlice';


const ManageProductsScreen = () => {

    const navigation = useNavigation();

    const {data, loading, status} = useGetProductsQuery();

    useLayoutEffect(() => {
      
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

  return (
    <SafeAreaView className="px-4 py-6">
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
            onPress={ () => navigation.navigate("CreateProduct")}
          >
            <PlusIcon size={22} color={"black"} />
          </TouchableOpacity>


      </View>
      <View className="flex-row items-center space-x-2 pb-2 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 items-center rounded-lg">
          <MagnifyingGlassIcon color="#009B37" size={20}/>
          <TextInput
          placeholder="Search for your favorite item"
          keyboardType="default"
          />
        </View>
      </View>
        <ScrollView className="" showsVerticalScrollIndicator={false}>

        
          {
            data?.map(prod => <ProductListingCard key={prod._id} product={prod} admin={true} />)
          }
        
        </ScrollView>
    </SafeAreaView>
  )
}

export default ManageProductsScreen