import { View, Text, SafeAreaView, ToastAndroid } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PrimaryButton from "./../components/PrimaryButton";
import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CATEGORIES } from "../helpers";
import { useCreateProductMutation } from "../redux/ProductSlice";
import { API_URL } from "../config";
import { CheckBox } from "@rneui/base";

const ProductFormScreen = () => {
  const { product } = useRoute().params;

  // console.log(product._id);
  // console.log( CATEGORIES.findIndex((cat) => cat.title == product.category))

  const [name, setName] = useState(product.name ?? "");
  const [description, setdescription] = useState(product.description ?? "");
  const [category, setcategory] = useState(
    product ? CATEGORIES.findIndex((cat) => cat.title == product.category) : 0
  );
  const [stockAvailability, setstockAvailability] = useState(
    `${product.inventory.stockAvailability}` ?? "100"
  );
  const [imageLink, setimageLink] = useState(product.image ?? "");
  const [price, setPrice] = useState(`${product.price}` ?? "");

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = async () => {
    console.log(imageLink);

    const new_product = {
      name,
      description,
      category: CATEGORIES[category].title,
      price: Number(price),
      image: imageLink,
      inventory: {
        stockAvailability: Number(stockAvailability),
      },
    };

    try {
      const res = await fetch(`${API_URL}/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_product),
      });

      const data = await res.json();

      if (res.ok) {
        ToastAndroid.show("Successful", ToastAndroid.LONG);
        navigation.navigate("Dashboard");
      } else {
        console.log(data.message);
        ToastAndroid.show(data.message, ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show("Network error, Try again later", ToastAndroid.LONG);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="px-4 pt-6 pb-4 bg-white flex-1">
      <View className="flex-row items-center justify-between w-full mb-4">
        <View>
          <TouchableOpacity className="" onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color={"black"} />
          </TouchableOpacity>
        </View>

        <Text className="font-bold text-lg">Product Form</Text>

        <View className="aspect-square w-5"></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
        <View className="space-y-2 mb-2">
          <Text>Product Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="product name here"
            className="flex-row flex-1 space-x-2 bg-gray-100 p-3 items-center rounded-lg"
          />
          {/* {errors.name && <Text className="text-red-500">This is required.</Text>} */}
        </View>

        <View className="space-y-2 mb-2">
          <Text>Product Description</Text>
          <TextInput
            value={description}
            onChangeText={setdescription}
            placeholder="product description here"
            className="flex-row flex-1 space-x-2 bg-gray-100 p-3 items-center rounded-lg"
          />
        </View>

        <View>
          <Text>Product Category</Text>
          <View className="flex-row flex-wrap">
            {CATEGORIES.map((cat, idx) => (
              <View key={idx} className="flex-row items-center space-x-2 w-1/2">
                <CheckBox
                  checked={category === idx}
                  onPress={() => setcategory(idx)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <Text>{cat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="space-y-2 mb-2">
          <Text>Product Image Link</Text>
          <TextInput
            value={imageLink}
            onChangeText={setimageLink}
            keyboardType="url"
            placeholder="https://pixabay.com/potatoes.jpg"
            className="flex-row flex-1 space-x-2 bg-gray-100 p-3 items-center rounded-lg"
          />
        </View>

        <View className="space-y-2 mb-2">
          <Text>Product Stock Availability:</Text>
          <TextInput
            value={stockAvailability}
            onChangeText={setstockAvailability}
            keyboardType="number-pad"
            placeholder="50"
            className="flex-row flex-1 space-x-2 bg-gray-100 p-3 items-center rounded-lg"
          />
        </View>

        <View className="space-y-2 mb-2">
          <Text className="" >Product Price:</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="number-pad"
            placeholder="29.99"
            className="flex-row flex-1 space-x-2 bg-gray-100 p-3 items-center rounded-lg"
          />
        </View>
      </ScrollView>

      {/* BUTTON */}

      <View className="flex-row justify-center align-middle gap-1 px-4">
        <PrimaryButton
          onPress={onSubmit}
          title={"Save Product"}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductFormScreen;
