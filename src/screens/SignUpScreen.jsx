import { View, Text, SafeAreaView, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { Input } from "@rneui/base";
import { ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native";
import {
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import ProgressIndicator from "../components/ProgressIndicator";
import { API_URL } from "../config";
import { ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [info, setInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignUp = async () => {
    const formData = {
      ...info,
      address: { ...addressInfo },
      image: `https://api.dicebear.com/6.x/personas/png?seed=${Math.floor(
        Math.random() * 10
      )}`,
    };

    const user_info = {
      email: info.email,
      password: info.password,
      role: "customer",
    };
    // handle sign-up logic with formData

    // Create User
    setLoading(true);
    const res = await fetch(`${API_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_info),
    });

    const data = await res.json();

    if (res.status == 200) {
      const customer = await fetch(`${API_URL}/auth/customer/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const c_data = await customer.json();

      if (customer.status == 200) {
        dispatch(setUser(c_data));
        navigation.navigate("Signin");
      } else {
        ToastAndroid.show(c_data.error, ToastAndroid.CENTER);
      }
    } else {
      ToastAndroid.show(data.error, ToastAndroid.LONG);
    }

    setLoading(false);

    console.log(formData);
  };

  const handlePrev = () => {
    setPage((page) => page - 1);
  };

  const handleNext = () => {
    setPage((page) => page + 1);
  };

  // MultiPage setup
  const renderPageOne = () => {
    return (
      <Animatable.View animation={"slideInLeft"} iterationCount={1}>
        <View className="h-full bg-white p-4">
          <ScrollView className="">
            <View className="justify-center items-center mb-8 mt-8">
              <Image
                source={require("../../assets/icon.png")}
                className="aspect-square h-16 mb-4 "
              />
              <Text className="font-medium text-lg">Personal Information</Text>
            </View>

            <Input
              placeholder="First Name"
              onChangeText={(text) => setInfo({ ...info, firstName: text })}
            />
            <Input
              placeholder="Last Name"
              onChangeText={(text) => setInfo({ ...info, lastName: text })}
            />

            <Input
              placeholder="Phone Number"
              onChangeText={(text) => setInfo({ ...info, phone: text })}
              maxLength={10}
              keyboardType="number-pad"
            />
          </ScrollView>
          <View className=" flex-1 flex-row items-center justify-between">
            <View className="aspect-square w-5"></View>
            <TouchableOpacity
              className="items-center justify-center p-4 rounded-full bg-primary"
              onPress={handleNext}
            >
              <ArrowRightIcon size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  };

  const renderPageTwo = () => {
    return (
      <Animatable.View animation={"slideInLeft"} iterationCount={1}>
        <View className="h-full bg-white p-4">
          <ScrollView className="">
            <View className="justify-center mb-8 mt-8 items-center">
              <Image
                source={require("../../assets/icon.png")}
                className="aspect-square h-16 mb-4"
              />
              <Text className="font-medium text-lg">Address Information</Text>
            </View>

            <Input
              placeholder="Street"
              value={addressInfo.street}
              onChangeText={(text) =>
                setAddressInfo({ ...addressInfo, street: text })
              }
            />

            <Input
              placeholder="Suburb"
              value={addressInfo.suburb}
              onChangeText={(text) =>
                setAddressInfo({ ...addressInfo, suburb: text })
              }
            />

            <Input
              placeholder="City"
              value={addressInfo.city}
              onChangeText={(text) =>
                setAddressInfo({ ...addressInfo, city: text })
              }
            />
            <Input
              placeholder="Province"
              value={addressInfo.province}
              onChangeText={(text) =>
                setAddressInfo({ ...addressInfo, province: text })
              }
            />
            <Input
              placeholder="Zip Code"
              value={addressInfo.zipCode}
              onChangeText={(text) =>
                setAddressInfo({ ...addressInfo, zipCode: text })
              }
            />
          </ScrollView>
          <View className="flex-row items-center justify-between px-4">
            <TouchableOpacity onPress={handlePrev}>
              <Text className="text-gray-500 font-medium">Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center justify-center p-4 rounded-full bg-primary"
              onPress={handleNext}
            >
              <ArrowRightIcon size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  };

  const renderPageThree = () => {
    return (
      <Animatable.View animation={"slideInLeft"} iterationCount={1}>
        <View className="relative h-full bg-white p-4">
          <ScrollView>
            <View className="justify-center mb-8 mt-8 items-center">
              <Image
                source={require("../../assets/icon.png")}
                className="aspect-square h-16 mb-4"
              />
              <Text className="font-medium text-lg">Account Infomation</Text>
            </View>

            <Input
              placeholder="Enter Email"
              onChangeText={(text) => setInfo({ ...info, email: text })}
            />
            <Input
              placeholder="Enter Password"
              secureTextEntry={true}
              onChangeText={(text) => setInfo({ ...info, password: text })}
            />
          </ScrollView>

          <View className="flex-row items-center justify-between px-4">
            <TouchableOpacity onPress={handlePrev}>
              <Text className="text-gray-600">Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center justify-center p-4 rounded-full bg-primary"
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ProgressIndicator color="white" size={24} />
              ) : (
                <CheckIcon size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  };

  let currentPage;
  switch (page) {
    case 1:
      currentPage = renderPageOne();
      break;
    case 2:
      currentPage = renderPageTwo();
      break;
    case 3:
      currentPage = renderPageThree();
      break;
    default:
      currentPage = renderPageOne();
  }

  return (
    <SafeAreaView className="flex-1 h-full relative">
      <TouchableOpacity
        className="absolute top-12 left-4"
        onPress={navigation.goBack}
      >
        <ArrowLeftIcon size={22} color={"black"} />
      </TouchableOpacity>

      {currentPage}
    </SafeAreaView>
  );
};

export default SignUpScreen;
