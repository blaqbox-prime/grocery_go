import { View, Text, TextInput, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ProductListingCard from '../components/ProductListingCard';
import { ScrollView } from 'react-native';
import { ArrowLeftIcon, MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetProductsQuery } from '../redux/ProductSlice';
import * as Animatable from 'react-native-animatable'
import ProgressIndicator from './../components/ProgressIndicator';
import { CATEGORIES } from '../helpers';

const ManageProductsScreen = () => {

    const navigation = useNavigation();

    const {data, isLoading, status} = useGetProductsQuery();
     const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {

      const unsubscribe = navigation.addListener('focus', () => {
        
      });
    
      return unsubscribe;
    
    }, [navigation.isFocused])

const emptyProduct = {
  name: "",
  description: "",
  image: "",
  price: "",
  inventory: {
    stockAvailability: "",
  },
  rating: 3,
  category: CATEGORIES[1].title,
}

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
    <SafeAreaView className="px-4 py-6 bg-white h-full">
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
            onPress={ () => navigation.navigate("CreateProduct",{product:emptyProduct})}
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
          onChangeText={(text) => {
            setSearchTerm(text);
            handleFilterProducts(text)
          }}
          />
        </View>
      </View>
        <ScrollView className="" showsVerticalScrollIndicator={false}>

          {
            isLoading && (
              <View className="w-full py-3 items-center justify-center">
                <Animatable.View
                animation={"slideInDown"}
                iterationCount={1}

              >
                <View className="items-center justify-center py-3">
                <ProgressIndicator />
                </View>
              </Animatable.View>
              </View>
            )
          }

          {
            (filtered.length == 0 && searchTerm.length > 0) && <Text className="text-lg p-4 text-center">No items match your search</Text> 
          }

          {
           filtered.length > 0 && filtered.map(prod => <ProductListingCard key={prod._id} product={prod} admin={true} />)
          }
        
          {
           filtered.length == 0 && data?.map(prod => <ProductListingCard key={prod._id} product={prod} admin={true} />)
          }
        
        </ScrollView>
    </SafeAreaView>
  )
}

export default ManageProductsScreen