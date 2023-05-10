import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { topSelling } from "../helpers";
import { useNavigation } from "@react-navigation/native";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import { API_URL } from "../config";
import ProgressIndicator from "./ProgressIndicator";
import * as Animatable from 'react-native-animatable'

const TopSelling = ({ admin = false, title = "Popular" }) => {
  const navigation = useNavigation();
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTopRated = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/products/popular`);
      const result = await res.json();

      setLoading(false);
      if (res.ok) {
        console.log(result);
        setTopRated(result);
      } else {
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        "Network error, please try again later",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    getTopRated();
  }, [navigation]);

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold">{title}</Text>
        {!admin && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Products");
            }}
          >
            <Text Text className="text-primary text-sm">
              View more
            </Text>
          </TouchableOpacity>
        )}
      </View>

      
      {/* Show loader when loading is true */}
    
      {loading && (
        <Animatable.View 
          animation="slideInRight"
          iterationCount={1}
          delay={2}
        >
          <ProgressIndicator />
        </Animatable.View>
      )}


      {topRated.length == 0 ? (
        <View className="border-gray-200 border-2 rounded-lg w-full h-32 items-center justify-center">
          <ShoppingBagIcon color={"gray"} />
          <Text className="text-gray-500 mt-2">No products available yet.</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topRated.map((product, idx) => {
            if (idx <= 8) {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  admin={admin}
                />
              );
            }
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default TopSelling;
