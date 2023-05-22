import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {useDispatch} from 'react-redux';
import {Product} from '../models';
import {cartSlice} from '../store/cartSlice';

type productItemType = {
  item: Product;
};

const ProductItem = ({item}: productItemType) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetails', {product: item}),
          console.log(
            'tıklanan ürünün kategorisi:',
            item.category,
            '----',
            'tıklanan ürünün alt kategorisi:',
            item.subCategory,
            "tıklanan ürünün id'si",
            item._id,
          );
      }}
      style={{
        width: width * 0.285,
        height: height * 0.25,
        //backgroundColor: 'red',
        marginTop: 12,
        marginLeft: 12,
        marginBottom: 12,
      }}>
      <Image
        style={{
          width: width * 0.285,
          height: width * 0.285,
          borderRadius: 10,
          borderWidth: 0.1,
          borderColor: 'gray',
        }}
        source={{
          uri: item.image,
        }}
      />
      <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
        <Text
          style={{
            textDecorationLine: 'line-through',
            color: '#747990',
            fontWeight: 'bold',
            fontSize: 10,
          }}>
          <Text>{'\u20BA'}</Text>
          {item.price}
        </Text>
        <Text
          style={{
            color: '#5D3EBD',
            fontWeight: 'bold',
            fontSize: 12,
            marginLeft: 4,
          }}>
          <Text>{'\u20BA'}</Text>
          {item.discountedPrice}
        </Text>
      </View>
      <Text
        style={{fontWeight: '600', fontSize: 13, marginTop: 4, color: 'black'}}>
        {item.name}
      </Text>
      <Text
        style={{
          color: '#747990',
          fontSize: 12,
          marginTop: 4,
          fontWeight: '600',
        }}>
        {item.amount}
      </Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(cartSlice.actions.addItemToCart({product: item}));
        }}
        style={{
          position: 'absolute',
          borderWidth: 0.3,
          right: -6,
          top: -6,
          borderRadius: 5,
          shadowRadius: 3.8,
          elevation: 3,
          shadowOpacity: 0.05,
          borderColor: 'lightgrey',
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: 30,
          height: 30,
        }}>
        <Entypo name="plus" size={22} color="#5D3EBD" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
