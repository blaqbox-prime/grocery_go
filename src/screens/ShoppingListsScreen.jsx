import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
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
import { useSelector } from "react-redux";

const ShoppingListsScreen = () => {


  const user = useSelector();

  const [formShown, setFormShown] = useState(false);
  const [shoppingLists, setShoppingLists] = useState(user.shoppingLists ?? []);

  const navigation = useNavigation();





  return (
    <SafeAreaView className="h-full bg-white p-4">
      <View className="flex-row items-center justify-between my-6">
        <TouchableOpacity className="" onPress={navigation.goBack}>
          <ArrowLeftIcon size={20} color={"black"} />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Shopping Lists</Text>
        <View className="aspect-square w-5"></View>
      </View>

      {shoppingLists.length === 0 && <Text className="p-4 mx-auto text-center text-lg font-medium text-gray-400">No orders here yet.</Text>}
          

      {loading ? (
        <View className="items-center justify-center ">
          <ProgressIndicator />
        </View>
      ) :

      (<ScrollView showsVerticalScrollIndicator={false}>
        {defaultShoppingLists.map((list, idx) => {
          return (
            <TouchableOpacity key={idx} onPress={() => {}}>
              <Card>
                <Card.Title>{list.title}</Card.Title>
              </Card>
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
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ShoppingListsScreen;
