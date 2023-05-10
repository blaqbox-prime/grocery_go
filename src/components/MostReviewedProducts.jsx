import { View, Text, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../config';
import ProgressIndicator from './ProgressIndicator';
import * as Animatable from 'react-native-animatable';
import { ShoppingBagIcon } from 'react-native-heroicons/outline';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';

const MostReviewedProducts = ({admin=false}) => {

    const [mostReviewed, setMostReviewed] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getMostReviewed = async () => {
       try {
        setLoading(true);
        
        const res = await fetch(`${API_URL}/reviews/most-reviewed`);
        const result = await res.json();

        setLoading(false);
        if(res.ok){
          console.log(result);
            setMostReviewed(result);
        }else {
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
        }
       } catch (error) {
        ToastAndroid.show("Network error, please try again later", ToastAndroid.SHORT);
       }
    }

    useEffect(()=>{
        getMostReviewed();
    },[navigation])

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold">Most Reviewed</Text>
      <Text Text className="text-primary text-sm"></Text>
      </View>
    
      {/* Show loader when loading is true */}
    
      {loading && (
        <View className="w-full py-3 items-center justify-center">
            <Animatable.View 
          animation="slideInDown"
          iterationCount={1}
          delay={2}
        >
          <ProgressIndicator />
        </Animatable.View>
        </View>
      )}

      {mostReviewed.length == 0 ? (
        <View className="border-gray-200 border-2 rounded-lg w-full h-32 items-center justify-center">
            <ShoppingBagIcon color={"gray"} />
            <Text className="text-gray-500 mt-2">No products available yet.</Text>
        </View>
      ): (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            {
                mostReviewed.map((product,idx) => {
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
      )}

    </View>
  )
}

export default MostReviewedProducts