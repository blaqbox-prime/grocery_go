import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CategoryIcon = ({icon,title}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={() => {

      if(title == "All"){
        navigation.navigate("Products")
      }else {
        navigation.navigate("ProductsInCategory",{
          category: title
        })
      }

      
    }}
    >
      <View className="items-center mr-4">
        <Image
        source={{uri:icon}}
        className="h-14 w-14 rounded-full mb-2"
        />
        <Text className="text-xs text-gray-400">{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CategoryIcon