import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import DashOrderCard from './DashOrderCard'

const DashOrdersList = ({orders}) => {
  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold">Orders</Text>
      <Text Text className="text-primary text-sm">Manage Orders</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            {
                orders.map((order) => <DashOrderCard 
                key={order._id}
                order={order}
                />)
            }
      </ScrollView>
    </View>
  )
}

export default DashOrdersList