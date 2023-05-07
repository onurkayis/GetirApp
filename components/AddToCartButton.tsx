import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Product} from '../models';
const {width, height} = Dimensions.get('window');
import {cartSlice} from '../store/cartSlice';
import {useDispatch} from 'react-redux';

type addToCartButtonType = {
  item: Product;
};

const AddToCartButton = ({item}: addToCartButtonType) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(cartSlice.actions.addItemToCart({product: item}));
      }}
      style={{
        backgroundColor: 'white',
        width: width,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#5C3EBC',
          width: '95%',
          height: height * 0.07,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 13,
          }}>
          Sepete Ekle
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({});
