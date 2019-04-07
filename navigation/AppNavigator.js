import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import DetailsScreen from '../screens/DetailsScreen';

export default createAppContainer(createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Cart: CartScreen
}));
