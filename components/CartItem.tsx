import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Product} from '../models';
const {width, height} = Dimensions.get('window');
import {cartSlice} from '../store/cartSlice';
import {useDispatch} from 'react-redux';

type CartItemProps = {
  product: Product;
  quantity: number;
};

function index({product, quantity}: CartItemProps) {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        productId: product._id,
        amount: 1,
      }),
    );
  };

  const decreaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        productId: product._id,
        amount: -1,
      }),
    );
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          height: height * 0.13,
          width: width * 0.92,
          marginHorizontal: width * 0.04,
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.4,
          borderBottomColor: 'lightgrey',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              height: height * 0.09,
              width: height * 0.09,
              borderRadius: 8,
              borderWidth: 0.4,
              borderColor: 'lightgray',
            }}
            source={{uri: product.image}}
          />
          <View style={{marginLeft: 8}}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 12,
                  maxWidth: width * 0.44,
                  color: 'black',
                }}>
                {product.name}
              </Text>
              <Text
                style={{
                  color: '#848897',
                  fontWeight: '600',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                {product.amount}
              </Text>
            </View>
            <Text
              style={{
                color: '#5D3EBD',

                fontSize: 14,
                marginTop: 6,
                fontFamily: 'Poppins-SemiBold',
              }}>
              <Text>{'\u20BA'}</Text>
              {product.discountedPrice}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: width * 0.22,
            height: height * 0.04,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderWidth: 0.5,
            borderColor: 'lightgrey',
          }}>
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#5D3EBD'}}>
              -
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: '#5D3EBD',
              height: height * 0.04,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: 'black',
              shadowOpacity: 0.5,
              elevation: 5,
            }}>
            <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
              {quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={increaseQuantity}
            style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#5D3EBD'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default index;
