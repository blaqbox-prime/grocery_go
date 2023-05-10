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
    }, 5000);
  }, []);

  return (
    <View className="bg-white justify-center items-center p-4 h-full">
      <View className="bg-transparent mx-auto my-auto justify-center items-center">
        <Animatable.Image
          source={require("../../assets/images/successful.gif")}
          animation="slideInUp"
          iterationCount={1}
          delay={2}
          className="aspect-square  h-60"
        />

        <Animatable.Text
          animation="slideInUp"
          iterationCount={1}
          delay={1}
          className="text-primary text-lg font-bold text-center mb-4"
        >
          Order successfully placed. Delivery will be made soon.
        </Animatable.Text>

        <Progress.Circle size={36} indeterminate={true} color="#009B37" />
      </View>
    </View>
  );
};

export default SuccessScreen;
