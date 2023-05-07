import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import GiftScreen from '../screens/GiftScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import FavoriteProductsScreen from '../screens/FavoriteProductsScreen';
const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Arama',
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const GiftStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GiftScreen"
        component={GiftScreen}
        options={{
          title: 'Kampanyalar',
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
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
      <Stack.Screen
        name="FavoriteProductsScreen"
        component={FavoriteProductsScreen}
        options={{
          headerTintColor: 'white',
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#5C3EBC'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}>
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
              Favori Ürünlerim
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return null;
};

const CustomTabBarButton = () => {
  return (
    <TouchableOpacity
      style={{
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 32,
        justifyContent: 'center',
        marginTop: -15,
        alignItems: 'center',
        backgroundColor: '#5C3EBC',
        width: 60,
        height: 60,
      }}>
      <Entypo name="list" size={32} color="#FFD00C" />
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#ffffff', height: 50},
        tabBarInactiveTintColor: '#959595',
        tabBarActiveTintColor: '#4C3398',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home-sharp"
              color={focused ? '#4C3398' : '#959595'}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="search"
              color={focused ? '#4C3398' : '#959595'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="user"
              color={focused ? '#4C3398' : '#959595'}
              size={29}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={GiftStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="gift-sharp"
              color={focused ? '#4C3398' : '#959595'}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
