import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import TopSelling from './../components/TopSelling';
import { sampleOrders, topSelling } from '../helpers';
import DashListedItems from './../components/DashListedItems';
import Promotions from './../components/Promotions';
import DashOrdersList from './../components/DashOrdersList';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config';
import { setUser } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';
import { ArrowRightOnRectangleIcon } from 'react-native-heroicons/outline';
import MostReviewedProducts from '../components/MostReviewedProducts';


const DashboardScreen = () => {


const navigation = useNavigation();

const [productsPreviewList, setProductsPreviewList] = useState([]);
const [popularProducts, setPopularProducts] = useState([]);
const [productCount, setProductCount] = useState(0);
const [ordersCount, setOrderCount] = useState(0);

const dispatch = useDispatch();

const getPopularProducts = async () => {
  const res = await fetch(`${API_URL}/products/popular`);

  const data = await res.json();

  if(res.status == 200){
    setPopularProducts(data);
  } else {
    console.log(data)
  }

}

const getProductCount = async () => {
  const res = await fetch(`${API_URL}/products/count`);

  const data = await res.json();

  if(res.status == 200){
    console.log(data.count);
    setProductCount(data.count);
  } else {
    console.log(data)
  }

}

const getOrderCount = async () => {
  const res = await fetch(`${API_URL}/orders/completed/count`);

  const data = await res.json();

  if(res.status == 200){
    console.log(data.count);
    setOrderCount(data.count);
  } else {
    console.log(data)
  }

}




useEffect(() => {

  const unsubscribe = navigation.addListener('focus', () => {
    getPopularProducts();
    getProductCount();
    getOrderCount();
  });

  return unsubscribe;

}, [navigation])


  return (
    <SafeAreaView className="px-4 pt-8 pb-4 flex-1 bg-white">
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1">
        <Text className="text-xl font-black capitalize" style={{maxWidth:150}} >Welcome to the dashboard</Text>
        </View>
        <TouchableOpacity className="flex-row items-start space-x-2 py-2"
        onPress={()=> {dispatch(setUser(null))}}
        >
          <Text className="font-bold ">Sign Out</Text>
          <ArrowRightOnRectangleIcon size={22} color={"red"} />
        </TouchableOpacity>
      </View>
      <ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>
        <TouchableOpacity className="bg-white shadow-gray-200 shadow-sm p-4 rounded-xl">
            <View className="py-2 flex-row items-start justify-between">

             <View>
             <Text className="text-4xl font-bold">{productCount}</Text>
              <Text className="text-gray-400 font-bold">Listed Products</Text>
             </View>

             <TouchableOpacity onPress={()=>{navigation.navigate("ManageProducts")}}>
             <Text Text className="text-primary text-sm">Manage Products</Text>
             </TouchableOpacity>

            </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white shadow-gray-200 shadow-sm p-4 rounded-xl">
            <View className="items-top justify-between flex-row py-2">

              <View>
              <Text className="text-4xl font-bold">{ordersCount}</Text>
              <Text className="font-bold text-gray-400">Orders Completed</Text>
              </View>

              <TouchableOpacity onPress={() => {navigation.navigate("Orders")}}>
             <Text Text className="text-primary text-sm">Manage Orders</Text>
             </TouchableOpacity>

            </View>
        </TouchableOpacity>

        {/* ORDERS */}

        <View>
            <DashOrdersList admin={true}/>
        </View>

        {/* DISCOUNTS */}
{/* 
        <View>
          <Promotions />
        </View> */}

        {/* Products */}

        <View>
          <MostReviewedProducts admin={true} />
        </View>

        {/* TOP SELLING */}

        <View>
            <TopSelling products={popularProducts} title={"Popular"} admin={true}/>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default DashboardScreen