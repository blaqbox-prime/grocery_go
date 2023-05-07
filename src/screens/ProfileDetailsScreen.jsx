import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

const ProfileDetailsScreen = () => {

const navigation = useNavigation();

  const user = useSelector((state) => state.authUser.user);
  const {street, suburb, city, province, zipCode} = user.address;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
<ScrollView showsVerticalScrollIndicator={false} className="px-4 bg-slate-50 h-full">
    <View className="">
      {/* Image */}
      <View className=" h-64 justify-center align-middle w-full">
          <View className="flex-row items-center justify-between my-6">
            <TouchableOpacity className="" onPress={navigation.goBack}>
              <ArrowLeftIcon size={20} color={"black"} />
            </TouchableOpacity>
            <Text className="text-lg font-bold">Profile Details</Text>
            <TouchableOpacity className="" onPress={()=>{navigation.navigate("EditProfile")}}>
              <Text className="text-primary">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className=" w-full">
            <Image
              source={{ uri: user.image }}
              className="aspect-square h-24 rounded-full mx-auto"
            />
            <Text className="text-center mt-2 font-bold text-lg">{`${user.firstName} ${user.lastName}`}</Text>
          </View>
        </View>

            <View className="bg-white shadow-gray-600 shadow-2xl rounded-lg p-4 space-y-6 mb-6">
                <View className="">
                <Text className="text-primary font-bold text-lg">Email</Text>
                <Text className="text-gray-500 text-xs">{user.email}</Text>
                </View>
                <View className="" style={{maxWidth: 250}}>
                <Text className="text-primary font-bold text-lg">Address</Text>
                <Text className="text-gray-500 text-xs">{`${street} ${suburb} ${city} ${province} ${zipCode}`}</Text>
                </View>
                <View className="" style={{maxWidth: 250}}>
                <Text className="text-primary font-bold text-lg">Phone</Text>
                <Text className="text-gray-500 text-xs">{user.phone}</Text>
                </View>
            </View>
            <View className="bg-white p-4 h-24 rounded-lg space-y-2 ">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-medium">Address</Text>
                        <TouchableOpacity>
                        <Text className="text-primary text-xs">Change</Text>
                        </TouchableOpacity>
                    </View >
                    <View className="flex-row items-center space-x-2">
                        <MapPinIcon size={24} color={"#009B37"} />
                        <View className>
                            <Text className="font-medium">{`${city}, ${province} ${zipCode}`}</Text>
                            <Text className="text-xs text-gray-500">{`${street} ${suburb} ${city} ${province} ${zipCode}`}</Text>
                        </View>
                    </View>
                </View>

    </View>
        </ScrollView>
  )
}

export default ProfileDetailsScreen