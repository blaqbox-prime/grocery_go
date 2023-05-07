import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ProductListScreen from '../screens/ProductListScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <NavigationContainer >
      <StackNavigator />
    </NavigationContainer>
  );
}

export default TabNavigator;