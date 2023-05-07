import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import {
  ArrowLeftIcon,
  CreditCardIcon,
  HeartIcon,
  InformationCircleIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import ProfileListItem from "./../components/ProfileListItem";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import { setUser } from "../redux/UserSlice";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const user = useSelector((state) => state.authUser.user);

  const dispatch = useDispatch();



  return (
    <SafeAreaView className="px-4 py-2 bg-white h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View className=" h-64 justify-center align-middle w-full">
          <View className="flex-row items-center justify-between my-6">
            <TouchableOpacity className="" onPress={navigation.goBack}>
              <ArrowLeftIcon size={20} color={"black"} />
            </TouchableOpacity>
            <Text className="text-lg font-bold">Profile</Text>
          <View className="aspect-square w-5"></View>
          </View>
          <View className=" w-full">
            <Image
              source={{ uri: user.image }}
              className="aspect-square h-24 rounded-full mx-auto"
            />
            <Text className="text-center mt-2 font-bold text-lg">{`${user.firstName} ${user.lastName}`}</Text>
          </View>
        </View>

        {/* LIST ITEMS */}

        <ProfileListItem
          text={"My Orders"}
          icon={<ShoppingBagIcon size={16} color={"#009B37"} />}
            onPress={() => {navigation.navigate("MyOrders")}}
        />
        <ProfileListItem
          text={"My Details"}
          icon={<UserIcon size={16} color={"#009B37"} />}
            onPress={() => {navigation.navigate("ProfileDetails")}}
        />
         <ProfileListItem
          text={"Shopping Lists"}
          icon={<HeartIcon size={16} color={"#009B37"} />}
            onPress={() => {navigation.navigate("ShoppingLists")}}
        />
        <ProfileListItem
          text={"Payment Methods"}
          icon={<CreditCardIcon size={16} color={"#009B37"} />}
            onPress={() => {}}
        />
        <ProfileListItem
          text={"Delivery Address"}
          icon={<MapPinIcon size={16} color={"#009B37"} />}
            onPress={() => {}}
        />
        <ProfileListItem
          text={"Help"}
          icon={<InformationCircleIcon size={16} color={"#009B37"} />}
            onPress={() => {}}
        />
        <ProfileListItem
          text={"Contact Us"}
          icon={<InformationCircleIcon  size={16} color={"#009B37"} />}
            onPress={() => {}}
        />
        <ProfileListItem
          text={"Log Out"}
          icon={<InformationCircleIcon size={16} color={"#009B37"} />}
            onPress={() => {dispatch(setUser(null))}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
