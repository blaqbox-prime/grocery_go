import { View, Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "./../components/PrimaryButton";
import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { CATEGORIES } from "../helpers";
import { useCreateProductMutation } from "../redux/ProductSlice";

const ProductFormScreen = () => {
  const navigation = useNavigation();

  const [createProduct, addProductRes] = useCreateProductMutation();

  const onSubmit = async () => {
   const product = {
    name,
    description,
    category,
    price:Number(price),
    imageUrl: imageLink,
    inventory: {
        stockAvailability: Number(stockAvailability)
    }
   };

  
    const res = await createProduct(product).unwrap();
    if(addProductRes.isSuccess){
      Alert.alert("Successfully added product");
      setTimeout(() => {
        navigation.goBack()
      },500)
    }

  }

  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [stockAvailability, setstockAvailability] = useState("100");
  const [imageLink, setimageLink] = useState("");
  const [price, setPrice] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);




  return (
    <SafeAreaView className="px-4 pt-6 pb-4 bg-white flex-1" >

      <View className="flex-row items-center justify-between w-full">
        <View >
            <TouchableOpacity
          className=""
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon size={20} color={"black"} />
        </TouchableOpacity></View>

        <Text className="font-bold text-lg">Product Form</Text>

        <View className="aspect-square w-5"></View>

      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">

        <View>
            <Text>Product Name</Text>
            <TextInput
        value={name}
        onChangeText={setName}
        placeholder="product name here" 
    className="bg-slate-200 p-2 my-2"
    />
            {/* {errors.name && <Text className="text-red-500">This is required.</Text>} */}
        </View>
            
        <View>
            <Text>Product Description</Text>
            <TextInput
        value={description}
        onChangeText={setdescription}
        placeholder="product description here" 
    className="bg-slate-200 p-2 my-2"
    />
        </View>


        {/* <View>
            <Text>Product Category</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}
            >
                {
                    CATEGORIES.map((category) => <Picker.Item key={category} label={category} value={category} />)
                }
            </Picker>
        </View>
         */}


        <View>
            <Text>Product Image Link</Text>
            <TextInput 
            value={imageLink}
            onChangeText={setimageLink}
            keyboardType="url"
            placeholder="https://pixabay.com/potatoes.jpg" 
            className="bg-slate-200 p-2 my-2"
            />
        </View>

        <View>
            <Text>Product Stock Availability</Text>
            <TextInput 
            value={stockAvailability}
            onChangeText={setstockAvailability}
            keyboardType="number-pad"
            placeholder="50" 
            className="bg-slate-200 p-2 my-2"
            />
        </View>

        <View>
            <Text>Product Price</Text>
            <TextInput 
            value={price}
            onChangeText={setPrice}
            keyboardType="number-pad"
            placeholder="29.99" 
            className="bg-slate-200 p-2 my-2"
            />
        </View>

      </ScrollView>

        {/* BUTTON */}

      <View className="flex-row justify-center align-middle gap-1 px-4">
        <PrimaryButton
          onPress={onSubmit}
          title={"Save Product"}
        />
      </View>
      
    </SafeAreaView>
  );
};

export default ProductFormScreen;
