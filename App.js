import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider, useSelector } from "react-redux";
import store from "./src/redux";
import AppNavigation from "./src/components/AppNavigation";




export default function App() {



  return (
    <Provider store={store}>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
    </Provider>
  );
}
