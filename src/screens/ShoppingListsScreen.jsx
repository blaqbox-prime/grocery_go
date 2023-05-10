import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import PrimaryButton from "./../components/PrimaryButton";
import { BottomSheet, Button, Card } from "@rneui/base";
import CreateShoppingListForm from "./../components/CreateShoppingListForm";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { defaultShoppingLists } from "./../helpers";
import ProgressIndicator from "../components/ProgressIndicator";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";
import { setUser } from "../redux/UserSlice";

const ShoppingListsScreen = () => {


  const user = useSelector((state) => state.authUser.user);

  const [formShown, setFormShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnListCreate = async (title) => {
      try{
        setLoading(true)
        const res = await fetch(`${API_URL}/customer/${user._id}/create-shopping-list`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            items: []
          })
        });
  
        const results = await res.json();
        
        setLoading(false);

        if(res.status == 200){
          console.log(results)
          dispatch(setUser({...user, shoppingLists: [ ...user.shoppingLists, results]}));
          ToastAndroid.show(`${title} created successfully` , ToastAndroid.SHORT);
          setFormShown(false)
        }else {
          ToastAndroid.show(results.message, ToastAndroid.SHORT);
          setFormShown(false)
        }

      } catch (err) {
        console.error(err);
        ToastAndroid.show("Network Error: Try again later", ToastAndroid.SHORT);
      }

  }


  return (
    <SafeAreaView className="h-full bg-white p-4">
      <View className="flex-row items-center justify-between my-6">
        <TouchableOpacity className="" onPress={navigation.goBack}>
          <ArrowLeftIcon size={20} color={"black"} />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Shopping Lists</Text>
        <View className="aspect-square w-5"></View>
      </View>

      {user && user?.shoppingLists?.length === 0 && <Text className="p-4 mx-auto text-center text-lg font-medium text-gray-400">No shopping lists here yet.</Text>}
          

      {loading ? (
        <View className="items-center justify-center ">
          <ProgressIndicator />
        </View>
      ) :

      (<ScrollView showsVerticalScrollIndicator={false}>
        {user && user?.shoppingLists?.map((list, idx) => {
          return (
            <TouchableOpacity key={idx} onPress={() => {}}>
              <View className="my-2 flex-row items-center justify-between">
                <Text className="font-medium">{list.title}</Text>
                <Text className="font-medium text-gray-400 shadow-sm shadow-gray-300" >{list.items.length}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>) }
      {/* -------------------------------------- */}
      <View className="flex-row">
      <PrimaryButton
        title={"Create Shopping List"}
        onPress={() => {
          setFormShown(true);
        }}
      />
      </View>

      <BottomSheet modalProps={{}} isVisible={formShown}>
        <CreateShoppingListForm
          onCancel={() => {
            setFormShown(false);
          }}

          onCreate={handleOnListCreate}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ShoppingListsScreen;
