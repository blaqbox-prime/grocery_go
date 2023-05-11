import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { API_URL, RandString } from "../config";
import { ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon, ShoppingBagIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { CheckBox } from "@rneui/base";

const PaymentScreen = () => {
  const navigation = useNavigation();

  const [selectedDelivery, setDelivery] = useState(0);
  const [selectedMethod, setPaymentMethod] = useState(0);

  const user = useSelector((state) => state.authUser.user);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { order } = useRoute().params;

  // console.log("\n Order On Payment Screen load:\n" + JSON.stringify(order));
  const methods = ["Cash", "Credit Card", "Debit Card"];

  const updatedOrder = order;
  updatedOrder.deliveryMethod =
    selectedDelivery == 0 ? "Door Delivery" : "Pick Up";
  updatedOrder.paymentMethod = methods[selectedMethod]
    .toUpperCase()
    .replace(" ", "_");

  const stripe = useStripe();

  console.log(
    "\n--------------------------- Updated Order-----------------------\n" +
      JSON.stringify(updatedOrder) +
      "\n--------------------------- -----------------------\n"
  );

  const UpdateOrderOnSuccessfulPayment = async () => {
    try {
      const res = await fetch(`${API_URL}/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      const result = await res.json();

      if (res.status == 200) {
        console.info(result);
      } else {
        console.log(result);
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Network Error", ToastAndroid.SHORT);
    }
  };

  const updateOrder = async () => {
    if (selectedMethod == 0) {
      navigation.navigate("SuccessScreen");
    } else {
      await openPaymentSheet();
    }
    // console.log(updatedOrder);
    // const updatedOrder = {
    //   ...order,
    //   timeSlot: selectedSlot.trim().concat(":00:00"),
    //   deliveryMethod: selectedDelivery == 0 ? "Door Delivery" : "Pick Up"
    // }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payments/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id: order.id }),
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
  };

  const openPaymentSheet = async () => {
    // setLoading(true);
    const { error } = await presentPaymentSheet({});
    // setLoading(false);

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } else {
      UpdateOrderOnSuccessfulPayment(updatedOrder);

      navigation.navigate("SuccessScreen");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51LCX8ZFAAnynwhcg2dqoiV1PTQ6jBSEdMsafBIiSvBe90NaJsomEc4XZd4dxVcoQM5DePCobrzN5M7bFAm1LGtqX00qdfFC0Sx">
      <SafeAreaView className="px-4 py-8 h-full bg-white">
        <View className="justify-between">
          <View className="flex-row items-center justify-between mb-2">
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

          <ScrollView showsVerticalScrollIndicator={false} className="h-full mb-2">
            {/* Order Summary */}

            <View className="bg-white shadow-lg shadow-gray-500 p-4 mb-2 rounded-lg flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-medium">Order Summary</Text>
                <Text className="font-medium" style={{ maxWidth: 200 }}>
                  {`#${order.id}`}
                </Text>

                <Text className="font-medium pt-1">
                  {user.firstName} {user.lastName}
                </Text>
                <Text className="font-medium ">{user.email}</Text>
                <Text className="font-medium ">{order.date}</Text>
                <Text className="font-bold text-primary text-xl mt-2 ">
                  {RandString.format(order.total)}
                </Text>
              </View>
              <View>
                <Text className="font-bold text-gray-600"></Text>
              </View>
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

            <View className="mt-4">
              <Text className="text-lg font-bold">Payment Method</Text>
              <View className="bg-white rounded-lg">
                {methods.map((method, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="flex-row items-center space-x-1 border-b-2 border-gray-50"
                    onPress={() => {
                      setPaymentMethod(idx);
                    }}
                  >
                    <CheckBox
                      checked={selectedMethod === idx}
                      onPress={() => setPaymentMethod(idx)}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                    />
                    <Text>{method}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Delivery Options */}

            <View className="mt-4">
              <Text className="text-lg font-bold">Delivery Method</Text>
              <View className="bg-white rounded-lg">
                <TouchableOpacity
                  className="flex-row items-center space-x-1 border-b-2 border-gray-50"
                  onPress={() => {
                    setDelivery(0);
                  }}
                >
                  <CheckBox
                    checked={selectedDelivery === 0}
                    onPress={() => setDelivery(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <Text>Door Delivery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center space-x-1"
                  onPress={() => {
                    setDelivery(1);
                  }}
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
        

        {/* CHECKOUT BTN */}

        <View className="flex-row justify-center align-middle gap-1 mt-auto">
          <TouchableOpacity
            className="bg-primary flex-1 rounded-lg p-3"
            onPress={updateOrder}
            disabled={!loading}
          >
            <View className="justify-center align-middle flex-row">
              <Text className="text-white font-bold text-center ml-4">
                {loading ? "Chekout" : "loading"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default PaymentScreen;
