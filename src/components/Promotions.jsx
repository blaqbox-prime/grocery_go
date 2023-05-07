import { View, Text, ScrollView } from "react-native";
import React from "react";
import PromotionCard from "./PromotionCard";
import { images } from "../config";

const Promotions = () => {
  return (
    <View className="mb-4">
      <Text className="text-lg font-bold mb-2">Promotions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <PromotionCard 
        title={"Chocolates"}
        text={"15% Off all Beacon bars"}
        image={"https://images.pexels.com/photos/8942899/pexels-photo-8942899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        />
           <PromotionCard 
        title={"Valid till 9 June"}
        text={"R100 off your first order"}
        image={"https://images.pexels.com/photos/4047288/pexels-photo-4047288.jpeg?cs=srgb&dl=pexels-jack-sparrow-4047288.jpg&fm=jpg&w=1280&h=854"}
        />
           <PromotionCard 
        title={"Doritos Promo"}
        text={"Buy 1 Get 1 Free Doritos Max"}
        image={"https://images.pexels.com/photos/7613677/pexels-photo-7613677.jpeg?cs=srgb&dl=pexels-los-muertos-crew-7613677.jpg&fm=jpg&w=1280&h=854"}
        />
      </ScrollView>
    </View>
  );
};

export default Promotions;
