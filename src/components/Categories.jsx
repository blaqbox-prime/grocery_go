import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../config'
import { CATEGORIES } from '../helpers'
import CategoryIcon from './CategoryIcon';

const Categories = () => {
  return (
    <View className="my-4">
    <Text className="text-lg font-bold">Shop by category</Text>   
    <ScrollView horizontal showsHorizontalScrollIndicator={false} 
     className="my-2"
    >
        {
            CATEGORIES.map((category, index) => <CategoryIcon key={index} title={category.title} icon={category.icon}/>)
        }
      
    </ScrollView>
    </View>
  )
}

export default Categories