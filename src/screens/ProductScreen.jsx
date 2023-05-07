import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ListBulletIcon,
  PlusIcon,
  PlusSmallIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { Image } from "react-native";
import { CATEGORIES } from "../helpers";
import CategoryIcon from "./../components/CategoryIcon";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "../redux/CartSlice";
import PrimaryButton from "../components/PrimaryButton";
import { BottomSheet } from "@rneui/base";
import {defaultShoppingLists} from './../helpers';
import { ToastAndroid } from "react-native";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();
  const { product, admin } = route.params;
  const { name, description, price, _id, image, category, inventory } =
    product;

  const [shoppingListsShown, setShoppingListsShown] = useState(false)

  const [addToCart, { isLoading, error }] = useAddToCartMutation();

  const user = useSelector((state) => state.authUser.user);

  const { icon } = CATEGORIES.find(
    (categoryItem) => categoryItem.title == category
  );

  const MAX_QTY = 50;
  const MIN_QTY = 1;

  const incQty = () => {
    if (qty < MAX_QTY) {
      setQty((prev) => prev + 1);
    }
  };

  const decQty = () => {
    if (qty > MIN_QTY) {
      setQty((prev) => prev - 1);
    }
  };

  const body = {
    "customer_id": user?._id ?? "644ee31156239445331cd710",
    "product_id": _id,
    "quantity": qty,
  }

  const onAddToCart = () => {
    addToCart(body)
      .unwrap()
      .then((payload) => {
        ToastAndroid.show('Added to Cart!', ToastAndroid.SHORT);
        navigation.navigate("Cart");
      })
      .catch((err) => {
        if(err.originalStatus == 200){
          ToastAndroid.show('Added to Cart!', ToastAndroid.SHORT);
          navigation.navigate("Cart");
        }
      });
  };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  // //   });

  //   return () => {};
  // }, []);

  return (
    <SafeAreaView className="pb-6 h-full w-full bg-white">
      <ScrollView>
        {/* IMAGE HEADER */}
        <View
          className=" h-80 relative justify-center align-middle"
          style={{ borderBottomEndRadius: 40, borderBottomStartRadius: 40 }}
        >
          <TouchableOpacity
            className="absolute top-12 left-4"
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={22} color={"black"} />
          </TouchableOpacity>

          {!admin && (<TouchableOpacity
            className="absolute top-12 right-4"
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <View className="relative">
              <View className="absolute aspect-square h-3 bg-primary rounded-full -top-0.5 right-0"></View>
              <ShoppingBagIcon size={22} color={"black"} />
            </View>
          </TouchableOpacity>)}

          <View className="mx-auto">
            <Image source={{ uri: image }} className="aspect-square h-48" />
          </View>
        </View>

        {/* name AND QTY */}

        <View className="px-4 mt-4 align-top flex-row justify-between">
          <View className="flex-1" style={{ maxWidth: 230 }}>
            <Text className="font-semibold text-xl ">{name}</Text>
          </View>

          {!admin && (<View className="bg-green-200 rounded-lg self-start flex-row justify-around px-2 py-1 w-28">
            <TouchableOpacity
              onPress={() => {
                decQty();
              }}
            >
              <Text className="font-bold text-lg">-</Text>
            </TouchableOpacity>
            <Text className="font-bold text-lg text-primary">
              {qty < 10 ? `0${qty}` : qty}
            </Text>
            <TouchableOpacity
              onPress={() => {
                incQty();
              }}
            >
              <Text className="font-bold text-lg text-primary">+</Text>
            </TouchableOpacity>
          </View>)}
        </View>

        <View className="px-4 mt-4 align-top flex-row justify-between">
          <View
            className={`${
              inventory.stockAvailability > 25 ? "bg-primary" : "bg-orange-700"
            } justify-center px-2 text-center rounded-lg h-6`}
          >
            <Text className="text-xs text-white mx-auto">
              {inventory.stockAvailability > 25 ? "Available" : "Limited Stock"}
            </Text>
          </View>

          <View className="self-start">
            <Text className="font-bold text-3xl text-gray-900">R{price}</Text>
            {qty > 1 && (
              <Text className="font-bold text-xs text-gray-500 self-end transition-opacity">
                R{(price * qty).toFixed(2)}
              </Text>
            )}
          </View>
        </View>

        <View className="px-4 mt-2 justify-start flex-row">
          <CategoryIcon icon={icon} title={category} />
        </View>

        <View className="px-4 my-6">
          <Text className="font-semibold text-gray-900 mb-2 text-lg">
            Details
          </Text>
          <Text className="text-gray-700 leading-6">{description}</Text>
        </View>
      </ScrollView>

      {/* BOTTOM BUTTONS */}
      <View className={admin && "flex-row justify-center align-middle gap-1 px-4"}>
        {admin ?
        ( <PrimaryButton 
          onPress={() => {
            navigation.navigate("CreateProduct",{product: product})
          }}
          title={"Update Product"}
          />)
        : (<View className="flex-row justify-center align-middle gap-1 px-4">
        <TouchableOpacity
          className="bg-primary flex-1 rounded-lg p-3"
          onPress={() => {
            onAddToCart();
          }}
          disabled={isLoading}
        >
          <View className="justify-center align-middle flex-row">
            <ShoppingCartIcon color={"white"} size={18} />
            <Text className="text-white font-bold text-center ml-4">
              Add to Cart
            </Text>
          </View>
        </TouchableOpacity>

        {/* Add to shopping list */}

        <TouchableOpacity className="bg-green-200  rounded-lg p-3" onPress={() => { setShoppingListsShown(true) }}>
          <ListBulletIcon size={18} color={"#009B37"} />
        </TouchableOpacity>
        </View>)}
      </View>
      {/* Shopping List Bottom Sheet */}
      <BottomSheet modalProps={{}} isVisible={shoppingListsShown} onBackdropPress={() => {setShoppingListsShown(false)}}>
          
          <View className="p-4 space-y-4 bg-white">
           <Text className="font-medium text-lg">Select Shopping List</Text>
            {
              defaultShoppingLists.map((list,idx) => {
                return (
                  <TouchableOpacity key={idx} onPress={() => {
                    list.items.push(product)
                    ToastAndroid.show(`Added to ${list.title}`,ToastAndroid.SHORT)
                    setShoppingListsShown(false);
                    }}>
                    <Text>{list.title}</Text>
                  </TouchableOpacity>
                )
              })
            }
            <View className="pt-4">
              <PrimaryButton title={"New Shopping List"} icon={<PlusSmallIcon color="white" />} onPress={()=> {navigation.navigate("ShoppingLists")}}/>
            </View>
          </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ProductScreen;
