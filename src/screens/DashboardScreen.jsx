import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import TopSelling from './../components/TopSelling';
import { sampleOrders, topSelling } from '../helpers';
import DashListedItems from './../components/DashListedItems';
import Promotions from './../components/Promotions';
import DashOrdersList from './../components/DashOrdersList';

const DashboardScreen = () => {
  return (
    <SafeAreaView className="px-4 pt-8 pb-4 flex-1 bg-white">
      <Text className="text-xl font-medium mb-4" style={{maxWidth:150}} >Welcome to the dashboard</Text>
      <ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>
        <TouchableOpacity className="bg-blue-200 shadow-slate-900 shadow-lg p-4 rounded-xl">
            <View className="items-center justify-center py-2">

              <Text className="text-3xl font-bold">216</Text>
              <Text className="font-medium">Listed Products</Text>

            </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-green-200 shadow-slate-900 shadow-lg p-4 rounded-xl">
            <View className="items-center justify-center py-2">

              <Text className="text-3xl font-bold">14</Text>
              <Text className="font-medium">Orders Completed</Text>

            </View>
        </TouchableOpacity>

        {/* ORDERS */}

        <View>
            <DashOrdersList orders={sampleOrders}/>
        </View>

        {/* DISCOUNTS */}

        <View>
          <Promotions />
        </View>

        {/* Products */}

        <View>
          <DashListedItems title={"Products"} products={topSelling}/>
        </View>

        {/* TOP SELLING */}

        <View>
            <TopSelling products={topSelling} admin={true}/>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default DashboardScreen