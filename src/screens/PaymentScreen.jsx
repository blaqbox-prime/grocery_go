import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { API_URL } from "../config";
import { ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon, ShoppingBagIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { CheckBox } from "@rneui/base";

const PaymentScreen = () => {
  const navigation = useNavigation();

  const [selectedSlot, setSlot] = useState("09:00 am");
  const [selectedDelivery, setDelivery] = useState(0);

  const user = useSelector((state) => state.authUser.user);
  // const {street, suburb, city, province} = user.address;

  // const {order} = useRoute().params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const TIME_SLOTS = [
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "01:00 pm",
    "02:00 pm",
    "03:00 pm",
    "04:00 pm",
    "05:00 pm",
  ];

  const stripe = useStripe();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const order_id = "644ee8577b6d384715d63422";

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payments/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id: order_id }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Grocery Go.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: user?.email ?? "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
    console.log(customer);
  };

  const openPaymentSheet = async () => {
    // setLoading(true);
    const { error } = await presentPaymentSheet({});
    // setLoading(false);

    if (error) {
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      // Alert.alert("Success", "Your order is confirmed!");
      navigation.navigate("SuccessScreen");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51LCX8ZFAAnynwhcg2dqoiV1PTQ6jBSEdMsafBIiSvBe90NaJsomEc4XZd4dxVcoQM5DePCobrzN5M7bFAm1LGtqX00qdfFC0Sx">
      <SafeAreaView className="px-4 py-8 h-full">
        <View className="justify-between">
          <View className="flex-row items-center justify-between my-8">
            <TouchableOpacity className="" onPress={navigation.goBack}>
              <ArrowLeftIcon size={22} color={"black"} />
            </TouchableOpacity>

            <Text className="font-bold text-lg">Checkout</Text>

            <TouchableOpacity
              className=""
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              <View className="relative">
                <View className="absolute aspect-square h-3 bg-primary rounded-full -top-0.5 right-0"></View>
                <ShoppingBagIcon size={24} color={"black"} />
              </View>
            </TouchableOpacity>
          </View>

          {/* {Address} */}

          <View className="bg-white shadow-lg shadow-gray-500 p-4 mb-2 rounded-lg flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-medium">Delivery Address</Text>
              <Text className="font-medium" style={{ maxWidth: 200 }}>
                {`${"10 Plum Street"} ${"Rivonia"} ${"Sandton"}, ${"Gauteng"}`}
              </Text>
              <Text className="pt-2">
                <Text className="font-medium">Mobile:</Text>
                {user.phone}
              </Text>
            </View>
            <View>
              <Text className="font-bold text-gray-600">Change</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Delivery Slot */}

            <View className="mt-4">
              <Text className="text-lg font-bold">Time Slot</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-4 py-2"
              >
                {TIME_SLOTS.map((slot) => {
                  return (
                    <TouchableOpacity
                      key={slot}
                      onPress={() => {
                        setSlot(slot);
                      }}
                    >
                      <View
                        className={`py-1 px-2 border border-primary rounded-lg ${
                          selectedSlot == slot && "bg-primary"
                        }`}
                      >
                        <Text
                          className={`${selectedSlot == slot && "text-white"}`}
                        >
                          {slot}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Payment Options */}

            <View className="mt-4">
              <Text className="text-lg font-bold">Delivery Method</Text>
              <View className="bg-white rounded-lg">
              <TouchableOpacity className="flex-row items-center space-x-1 border-b-2 border-gray-50"
              onPress={() => {setDelivery(0)}}
              >
              <CheckBox
                  checked={selectedDelivery === 0}
                  onPress={() => setDelivery(0)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <Text>Door Delivery</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center space-x-1"
              onPress={() => {setDelivery(1)}}
              >
              <CheckBox
                  checked={selectedDelivery === 1}
                  onPress={() => setDelivery(1)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <Text>Pick Up</Text>
              </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </View>

        {/* CHECKOUT BTN */}

        <View className="flex-row justify-center align-middle gap-1 mt-auto">
          <TouchableOpacity
            className="bg-primary flex-1 rounded-lg p-3"
            onPress={openPaymentSheet}
            disabled={!loading}
          >
            <View className="justify-center align-middle flex-row">
              <Text className="text-white font-bold text-center ml-4">
                {loading ? "Chekout" : "loading"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default PaymentScreen;
