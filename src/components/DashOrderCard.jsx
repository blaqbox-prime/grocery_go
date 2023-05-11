import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { API_URL, RandString } from "../config";
import { ArrowRightIcon, CheckIcon, MapPinIcon, ShoppingBagIcon, ShoppingCartIcon } from "react-native-heroicons/outline";


const DashOrderCard = ({ order, isAdmin=false, callback }) => {
  
const {width, height} = useWindowDimensions();

  useEffect(() => {
    
  }, [order.deliveryStatus])
  

  const statuses = ["Preparing", "Ready", "Shipping", "Completed"];

  const getColor = () => {
    switch (order.deliveryStatus) {
      case "Completed":
        return "bg-primary";
        break;
      case "Ready":
        return "bg-blue-500";
        break;
      case "Preparing":
        return "bg-orange-500";
        break;
      case "Shipping":
        return "bg-teal-500";
        break;
      default:
        return "bg-red-500";
        break;
    }
  };

  const handleStatusUpdate = async () => {
    switch (order.deliveryStatus) {
      case "Completed":
        order.deliveryStatus = "Completed";
        break;
      case "Ready":
        order.deliveryStatus = "Shipping";        break;
      case "Preparing":
        order.deliveryStatus = "Ready";
        break;
      case "Shipping":
        order.deliveryStatus = "Completed";
        break;
    }

    try {
      const res = await fetch(`${API_URL}/orders/${order.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(order)
      });

      const result = await res.json();

      if(res.status == 200){
          console.info(result);
          ToastAndroid.show("Order is now " + order.deliveryStatus,ToastAndroid.SHORT)  
          if(isAdmin){
            callback();
          }

      }else{
      console.log(result)
      ToastAndroid.show(result.message,ToastAndroid.SHORT)  
      }

    } catch (error) {
      console.error(error);
      ToastAndroid.show("Network Error",ToastAndroid.SHORT)
    }

  }

  const getIcon = () => {
    switch (order.deliveryStatus) {
      case "Completed":
        return <CheckIcon size={22} color={"white"} />;
        break;
      case "Ready":
        return <ShoppingBagIcon size={22} color={"white"} />;
        break;
      case "Preparing":
        return <ShoppingCartIcon size={22} color={"white"} />;
        break;
      case "Shipping":
        return <MapPinIcon size={22} color={"white"} />;
        break;
    }
  }

  return (
    <TouchableOpacity className="mr-2 relative rounded-xl" style={{width:(width - 32)}} >
      <View className="h-32 bg-white  shadow-black shadow-sm rounded-lg ">
        <View className=" absolute left-2 top-2 ">
          <View
            className={`
            justify-center text-center rounded-lg h-6`}
          >
            <View className="items-center space-x-2 flex-row">
              <View
                className={`${getColor()} aspect-square h-4 rounded-full`}
              ></View>
              <Text className={`font-medium`}>{order.deliveryStatus}</Text>
            </View>
          </View>
          <Text>#{order.id}</Text>
          <Text className="font-bold uppercase w-48 ">
            {order.address.street}, {order.address.suburb}
          </Text>
          <Text className="font-medium">
            {RandString.format(order.total)}
          </Text>
          </View>

        <TouchableOpacity className={`absolute bottom-2 right-3 p-3 rounded-full ${getColor(order.deliveryStatus)}`}
        onPress={handleStatusUpdate}
        >
          {
           isAdmin && (order.deliveryStatus != "Completed" ? <ArrowRightIcon size={22} color={"white"} /> : <CheckIcon size={22} color={"white"} />)
          }


          {
            !isAdmin && getIcon()
          }

        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DashOrderCard;
