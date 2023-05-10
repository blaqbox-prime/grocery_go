import { View, Text, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config';
import ProgressIndicator from '../components/ProgressIndicator';

const OrdersScreen = ({admin=false}) => {

    const user = useSelector((state) => state.authUser.user);

    // Fetch Orders 

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/orders/`);
      
      setLoading(false);
      const data = await res.json();
      if (res.statusCode == 200){
         setOrders(data);
         console.log(data);  
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }      
    } catch (error) {
      ToastAndroid.show("No internet connection, please try again", ToastAndroid.SHORT)
    }
    } 



    // include navigation
    const navigation = useNavigation()

   

  return (
    <SafeAreaView className="px-4 py-6 bg-white h-full">
      <View className="flex-row items-center justify-between my-4">
      <TouchableOpacity
            className=""
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={22} color={"black"} />
          </TouchableOpacity>

        <Text className="font-bold text-lg">Products</Text>

        <TouchableOpacity
            className=""
            onPress={ () => navigation.navigate("CreateProduct",{product:emptyProduct})}
          >
            <PlusIcon size={22} color={"black"} />
          </TouchableOpacity>


      </View>
        <ScrollView className="" showsVerticalScrollIndicator={false}>

          {
            loading && (
              <View className="w-full py-3 items-center justify-center">
                <Animatable.View
                animation={"slideInDown"}
                iterationCount={1}

              >
                <View className="items-center justify-center py-3">
                <ProgressIndicator />
                </View>
              </Animatable.View>
              </View>
            )
          }

          {
            orders.length == 0 && <Text className="text-lg p-4 text-center">No items match your search</Text> 
          }
        
          {
           orders.length > 0 && orders.map((order,idx) => <OrderCard admin={admin} order={order}/>)
          }
        
        </ScrollView>
    </SafeAreaView>
  )
}

export default OrdersScreen