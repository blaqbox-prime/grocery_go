import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config';

const OrdersScreen = () => {

    const user = useSelector((state) => state.authUser.user);

    // Fetch Orders 

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrders = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/orders/${user._id}/all`);
      
      setLoading(false);
      if (res.statusCode == 200){
         const data = await res.json();
         setOrders(data);
         console.log(data);  
      }
    } 



    // include navigation
    const navigation = useNavigation()

   

  return (
    <SafeAreaView className="p-4 bg-white">
        {/* LIST ALL OF THE USERS ORDERS */}

    </SafeAreaView>
  )
}

export default OrdersScreen