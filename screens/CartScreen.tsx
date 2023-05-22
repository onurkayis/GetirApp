import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CartItem from '../components/CartItem';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {cartSlice, selectSubTotal} from '../store/cartSlice';
import client from '../api/client';
import {useLogin} from '../context/LoginProvider';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {useStripe} from '@stripe/stripe-react-native';

const CartScreen = () => {
  const {setLoginPending, profile} = useLogin();
  const cartItems = useSelector(state => state.cart.items);
  const subTotal = useSelector(selectSubTotal);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async () => {
    // 1. Create a payment intent
    const res = await client.post('/payments/intents', {
      amount: Math.floor(subTotal * 100),
    });
    if (res.error) {
      console.log(res.error);
      Alert.alert('Bir şeyler yanlış gitti :(');
      return;
    }
    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Getir',
      paymentIntentClientSecret: res.data.paymentIntent,
      defaultBillingDetails: {
        name: profile.adSoyad,
        phone: profile.telefonNumarası,
        email: profile.epostaAdresi,
        address: profile.address,
      },
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Bir şeyler yanlış gitti :(');
      return;
    }
    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();
    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }
    // 4. If payment ok -> create the order
    onCreateOrder();
  };

  const onCreateOrder = async () => {
    setLoginPending(true);
    setTimeout(async () => {
      const result = await client.post('/orders', {
        items: cartItems,
        totalPrice: subTotal,
        customer: {
          name: profile.adSoyad,
          address: profile.address,
          phoneNumber: profile.telefonNumarası,
          email: profile.epostaAdresi,
        },
      });
      if (result.data.status == 'OK') {
        /* showMessage({
          message: 'Siparişiniz Alındı!',
          type: 'success',
        }); */
        Alert.alert(
          'Siparişiniz alındı',
          `Sipariş takip kodunuz: ${result.data.data.ref}`,
        );
      } else {
        Alert.alert('Bir şeyler yanlış gitti :(');
      }
      dispatch(cartSlice.actions.clearCart());
      console.log(result.data.status);
      setLoginPending(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        <FlatList
          data={cartItems}
          renderItem={({item}) => (
            <CartItem product={item.product} quantity={item.quantity} />
          )}
        />
      </ScrollView>
      <View
        style={{
          backgroundColor: '#EEEEEE',
          width: width,
          height: height * 0.1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={onCheckout}
          style={{
            width: width * 0.7,
            backgroundColor: '#5C3EBC',
            height: height * 0.07,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 13,
            }}>
            Devam
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.25,
            backgroundColor: 'white',
            height: height * 0.07,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}>
          <Text
            style={{
              color: '#5C3EBC',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 17,
            }}>
            {'\u20BA'}
          </Text>
          <Text
            style={{
              color: '#5C3EBC',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 17,
            }}>
            {subTotal.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
