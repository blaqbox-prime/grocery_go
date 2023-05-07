import { View, Text, TouchableOpacity } from "react-native";
import React from "react";


const IconButton = ({onPress,children}) => {
  return (
    <TouchableOpacity className="aspect-square rounded-full p-2 bg-green-100 align-middle"
    onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
