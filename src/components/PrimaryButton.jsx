import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const PrimaryButton = ({onPress, title, icon, disabled=false}) => {
  return (
    <TouchableOpacity
          className="bg-primary flex-1 rounded-lg p-3"
          onPress={onPress}
          disabled={disabled}
        >
          <View className="justify-center align-middle flex-row">
            {icon && icon}
            <Text className="text-white font-bold text-center ml-4">
              {title}
            </Text>
          </View>
        </TouchableOpacity>
  )
}

export default PrimaryButton