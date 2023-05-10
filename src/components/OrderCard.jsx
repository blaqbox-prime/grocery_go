import { View, Text } from 'react-native'
import React from 'react'

const OrderCard = ({admin=false, order}) => {
  return (
    <View className="bg-white shadow-sm m-2 shadow-gray-500 p-2 rounded-lg flex-row items-center justify-between">
    <View>
      <Text className="text-lg font-medium">Order Summary</Text>
      <Text className="font-medium" style={{ maxWidth: 200 }}>
        {`#${order.id}`}
      </Text>
      
        <Text className="font-medium pt-1">{order.customer.firstName} {order.customer.lastName}</Text>
        <Text className="font-medium ">{order.customer.email}</Text>
        <Text className="font-medium ">{order.date}</Text>
        <Text className="font-bold text-primary text-xl mt-2 ">{RandString.format(order.total)}</Text>
    </View>
    <View>
      <Text className="font-bold text-gray-600"></Text>
    </View>
  </View>

  )
}

export default OrderCard