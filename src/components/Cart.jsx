import { View, Text, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useCreateOrderMutation } from '../redux/OrderSlice';
import CartItemCard from './CartItemCard';
import { TagIcon, TrashIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import { useGetCartQuery, useRemoveFromCartMutation } from '../redux/CartSlice';
import { RandString } from '../config';
import { useSelector } from 'react-redux';
import { ListItem } from '@rneui/base';

const Cart = ({user_id}) => {

    const {data,error,status} = useGetCartQuery(user_id)
    const user = useSelector((state) => state.authUser.user);

    console.log(data)
  
  const [createOrder, createOrderOpt] = useCreateOrderMutation();
  const [removeItem, removeItemOpt] = useRemoveFromCartMutation();
  
  
  const navigation = useNavigation();
  const DEFAULT_DELIVERY_CHARGE = 9.99;
  const DEFAULT_DISCOUNT = 0;

  // CREATE ORDER

  const handleOnCheckoutPress = async () => {
    const newOrder = {
      date: new Date().toISOString().replace('Z', '+00:00'),
      paymentMethod: "CARD",
      address: user,
      deliveryStatus: "Preparing",
      deliveryFee: DEFAULT_DELIVERY_CHARGE,
    } 

    console.log(newOrder)

     await createOrder({body:newOrder, id:user._id}).unwrap()
     .then(({originalStatus, data}) => {
        if (originalStatus == 200) {
            Alert.alert(data);
            navigation.navigate("Checkout")
        }
     }).catch(({originalStatus, data}) => {
        if (originalStatus == 200) {
            Alert.alert(data);
            navigation.navigate("Checkout")
        }
     });

  }

  return (
    <View className="flex-1">
      <ScrollView>
        {
          data?.cartItems && data.cartItems.map(cartItem => {
            return (
              <ListItem.Swipeable key={cartItem.product._id}
              // rightWidth={100}
              minSlideWidth={40}
              rightContent={() => (
                <TouchableOpacity className="flex-1 items-center justify-center bg-gray-200"
                onPress={async () => {
                  await removeItem(cartItem.product_id, user_id).unwrap()
                  .catch((error) => {
                    if(error.originalStatus == 200){
                      ToastAndroid.show("Removed from cart", ToastAndroid.SHORT)
                    }
                  })
                }}
                >
                   <TrashIcon size={24} color={"red"} />
                </TouchableOpacity>
              )}
              >
                <CartItemCard  cartItem={cartItem}/>
              </ListItem.Swipeable>
            )
          })
        }
      </ScrollView>

      {/* BOTTOM SECTION */}
      <View>
        {/* COUPON FIELD */}

        <View className="bg-white shadow-sm shadow-gray-300 p-2 mb-2 rounded-lg flex-row items-center justify-between">
          <TextInput placeholder="Add Your Promo Code" />
          <TagIcon size={22} fill={"green"} color={"green"}/>
        </View>

        {/* CART TOTALS */}

        <View className="bg-white shadow-lg shadow-gray-500 p-3 mb-4 rounded-lg ">
          {/* SUBTOTAL */}
          <View className=" mb-2 flex-row align-middle justify-between">
            <Text className="text-gray-700 font-medium">Subtotal</Text>

            <Text className="font-medium">{RandString.format(data?.total ?? 0)}</Text>
          </View>

          {/* DISCOUNT */}
          <View className=" mb-2 flex-row align-middle justify-between">
            <Text className="text-gray-700 font-medium">Discount</Text>

            <Text className="font-medium text-green-500">{RandString.format(DEFAULT_DISCOUNT)}</Text>
          </View>

          {/* DELIVERY CHARGES */}
          <View className=" mb-2 flex-row align-middle justify-between">
            <Text className="text-gray-700 font-medium">Delivery Charges</Text>

            <Text className="font-medium text-red-500">{RandString.format(DEFAULT_DELIVERY_CHARGE)}</Text>
          </View>

          {/* TOTAL */}
          <View className=" mb-2 mt-2 flex-row align-middle justify-between">
            <Text className="text-black text-lg font-extrabold">Total</Text>

            <Text className="font-medium text-primary">{RandString.format(data?.total ?? 0)}</Text>
          </View>
        </View>

        {/* CHECKOUT BUTON */}
        <View className="flex-row justify-center align-middle gap-1">
          <TouchableOpacity
            className="bg-primary flex-1 rounded-lg p-3"
            onPress={handleOnCheckoutPress}
            disabled={data?.cartItems == null || data?.cartItems.length == 0}
          >
            <View className="justify-center align-middle flex-row">
              <Text className="text-white font-bold text-center ml-4">
                Proceed to Checkout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Cart