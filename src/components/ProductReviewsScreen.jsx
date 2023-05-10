import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ShoppingBagIcon } from 'react-native-heroicons/outline';
import ProductCard from './ProductCard';

const ProductReviewsScreen = () => {

    const {product} = useRoute();
    const user = useSelector((state) => state.authUser.user);
    const navigation = useNavigation();


  return (
   <View>
    <Text>Stuff Going On</Text>
   </View>
  )
}

export default ProductReviewsScreen