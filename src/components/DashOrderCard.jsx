import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {RandString} from "../config"

const DashOrderCard = ({ order }) => {
  // const color = () => {
  //     switch (order.deliveryStatus) {
  //         case "Preparing":
  //             return "blue";
  //             break;
  //         case "Ready": return "orange";
  //             break;
  //         case "Completed": return "primary";
  //         break;
  //         case "Shipping": return "purple";
  //         break;
  //         default: return "slate"
  //             break;
  //     }
  // }

  // console.log(color());

  return (
    <TouchableOpacity
      className="mr-2 relative rounded-xl w-full"
        >
      <View className="h-32 bg-white border-gray-400 border-2 shadow-black shadow-md rounded-lg ">
        <View className=" absolute left-6 top-6 ">
          <View
            className={`
            
            justify-center px-2 text-center rounded-lg h-6`}
          >
            <Text className={`text-sm font-medium text-white p-2  ${
              order.deliveryStatus == "Completed"
                ? "bg-primary"
                : order.deliveryStatus == "Ready"
                ? "bg-blue-500"
                : order.deliveryStatus == "Preparing"
                ? "bg-orange-500"
                : order.deliveryStatus == "Shipping"
                ? "bg-teal-500"
                : "bg-red-700"
            }`}>
              {order.deliveryStatus}
            </Text>
          </View>
          <Text className="font-bold uppercase w-48 text-lg">
            {order.address.street}, {order.address.suburb}
          </Text>
          <Text className="text-xs text-gray-300">#{order._id}</Text>
        </View>

            <View className="absolute bottom-2 right-3">
                <Text className="text-primary font-medium text-lg">{RandString.format(order.total)}</Text>
            </View>

      </View>
    </TouchableOpacity>
  );
};

export default DashOrderCard;
