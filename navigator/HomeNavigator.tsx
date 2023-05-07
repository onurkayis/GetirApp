import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import CartScreen from '../screens/CartScreen';
import CategoryFilterScreen from '../screens/CategoryFilterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {selectSubTotal} from '../store/cartSlice';
import {cartSlice} from '../store/cartSlice';

const {height, width} = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const tabHiddenRoutes = ['ProductDetails', 'CartScreen'];

function HomeStack({navigation, route}: {}) {
  const [show, setShow] = useState(true);
  const subTotal = useSelector(selectSubTotal);
  console.log(subTotal);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log('Route Name is ', routeName);
    if (tabHiddenRoutes.includes(routeName)) {
      console.log('Kapat ', routeName);
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      console.log('Aç ', routeName);
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              resizeMode="contain"
              style={{width: 70, height: 30}}
              source={require('../assets/getirlogo.png')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryFilterScreen}
        options={{
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text
              style={{
                fontSize: 13,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Ürünler
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CartScreen')}
              style={{
                width: width * 0.22,
                height: 33,
                backgroundColor: 'white',
                borderRadius: 9,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 23, height: 23, marginLeft: 6}}
                source={require('../assets/cart.png')}
              />
              <View style={{width: 5, height: 30, backgroundColor: 'white'}} />
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#F3EFFE',
                  height: 30,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#5D3EBD',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  <Text>{'\u20BA'}</Text>
                  {subTotal.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{
          headerTintColor: 'white',
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#5C3EBC'},
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
                color: 'white',
              }}>
              Ürün Detayı
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setShow(prev => !prev);
              }}>
              {show ? (
                <Octicons name="heart" size={21} color="white" />
              ) : (
                <Octicons name="heart-fill" size={21} color="#F7D102" />
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTintColor: 'white',
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#5C3EBC'},
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
                color: 'white',
              }}>
              Sepetim
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => dispatch(cartSlice.actions.clearCart())}>
              <Ionicons name="trash" size={22} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeNavigator({navigation, route, cartItems}) {
  return (
    <HomeStack navigation={navigation} route={route} cartItems={cartItems} />
  );
}

export default HomeNavigator;
