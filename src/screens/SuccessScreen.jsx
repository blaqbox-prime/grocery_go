import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const SuccessScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1500);
  }, []);

  return (
    <View className="bg-white flex-1 justify-center items-center p-4">
      <View className="bg-transparent mx-auto my-auto">
        <Animatable.Image
          source={require("../../assets/images/successful.gif")}
          animation="slideInUp"
          iterationCount={1}
          className="aspect-square w-96"
        />

        <Animatable.Text
          animation="slideInUp"
          iterationCount={1}
          className="text-primary text-lg font-bold text-center"
        >
          Order successfully placed. Delivery will be made soon.
        </Animatable.Text>

        <Progress.Circle size={60} indeterminate={true} color="#009B37" />
      </View>
    </View>
  );
};

export default SuccessScreen;
