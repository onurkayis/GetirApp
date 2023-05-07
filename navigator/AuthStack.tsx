import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useLogin} from '../context/LoginProvider';
import TabNavigator from './TabNavigator';
import AppLoader from '../components/AppLoader';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ForgotPasswordOTP from '../screens/ForgotPasswordOTP';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Giriş Yap',
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: 'Şifremi Unuttum',
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'Üye Ol',
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
      <Stack.Screen
        name="ForgotPasswordOTP"
        component={ForgotPasswordOTP}
        options={{
          title: 'Kod Girme',
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: 'Şifre Değiştirme',
          headerStyle: {
            backgroundColor: '#4C3398',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  const {isLoggedIn, loginPending} = useLogin();
  return isLoggedIn ? (
    <>
      <TabNavigator />
      {loginPending ? <AppLoader /> : null}
    </>
  ) : (
    <StackNavigator />
  );
};

export default AuthStack;
