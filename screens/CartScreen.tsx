import {
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
import {useSelector} from 'react-redux';
import {selectSubTotal} from '../store/cartSlice';

const CartScreen = () => {
  const cartItems = useSelector(state => state.cart.items);
  const subTotal = useSelector(selectSubTotal);
  console.log(subTotal);

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
