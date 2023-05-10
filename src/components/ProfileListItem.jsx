import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronRightIcon } from 'react-native-heroicons/outline'

const ProfileListItem = ({icon, text, onPress}) => {
  return (
   <TouchableOpacity 
   onPress={() => onPress()}
   >
     <View className="flex-row items-center justify-between p-4 mx-2 bg-white shadow-gray-900 shadow-sm rounded-lg mb-4">
      <View className="flex-row items-center space-x-2">
        {icon}
        <Text className="font-medium text-gray-800">{text}</Text>
      </View>

    <ChevronRightIcon size={16} color="black"/>

    </View>
   </TouchableOpacity>
  )
}

export default ProfileListItem