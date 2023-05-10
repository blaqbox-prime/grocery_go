import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/base";
import PrimaryButton from "./../components/PrimaryButton";
import { ToastAndroid } from "react-native";
import { API_URL } from "./../config";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import ProgressIndicator from "./../components/ProgressIndicator";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleSignIn = async () => {
    const body = {
      email: email,
      password: password,
    };

    console.log(body);

    setLoading(true);

   try{
    const res = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    const data = await res.json();


    if (res.status == 200) {
      console.log(data);
      ToastAndroid.show("Welcome Back!", ToastAndroid.SHORT);
      
      if(data.role == "customer"){
        const user = await fetch(`${API_URL}/customer/${data.email}`);
      const user_data = await user.json();
      dispatch(setUser(user_data));
      // navigation.navigate("Home");
      } else {
        dispatch(setUser(data))
      }

    } else {
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
   }
   catch(e){
    ToastAndroid.show("No internet connection", ToastAndroid.SHORT);
   }
    setLoading(false);
  };

  return (
    <SafeAreaView className="px-4 py-6 flex-1">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../../assets/icon.png")}
          className="mb-4 mx-auto aspect-square  h-36"
        />
        <Input
          leftIcon={<EnvelopeIcon size={22} color={"green"} />}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          leftIcon={<LockClosedIcon size={22} color={"green"} />}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {loading ? <ProgressIndicator /> : 
        (<View className="flex-row">
          <PrimaryButton
            title={"Sign In"}
            onPress={handleSignIn}
            disabled={loading}
          />
        </View>
        )}
        <TouchableOpacity
          className=" flex-row mt-3"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text className="text-red-500 text-sm font-medium">
            Don't have an account? Sign Up Here
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
