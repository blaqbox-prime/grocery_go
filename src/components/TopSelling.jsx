import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import { topSelling } from '../helpers'

const TopSelling = ({products, admin=false}) => {
  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold">Top Selling</Text>
      <Text Text className="text-primary text-sm">View more</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                products.map((product, idx) => {
                if(idx <= 8) {
                  return (<ProductCard 
                    key={product._id}
                    product={product}
                    admin={admin}
                    />);  
                }
                })
            }
      </ScrollView>
    </View>
  )
}

export default TopSelling