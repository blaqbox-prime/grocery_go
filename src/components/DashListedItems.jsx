import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const DashListedItems = ({title, products}) => {

  const navigation = useNavigation();

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold">{title}</Text>
      <TouchableOpacity
      onPress={() => {
        navigation.navigate("ManageProducts")
      }}
      >
      <Text Text className="text-primary text-sm">Manage Products</Text>
      </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                products.reverse().map((product) => <ProductCard 
                key={product._id}
                product={product}
                admin={true}
                />)
            }
      </ScrollView>
    </View>
  )
}

export default DashListedItems