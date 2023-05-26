import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

//ürün detay propsları
type DetailBoxProps = {
  name: string;
  price: number;
  amount: string;
  discountedPrice: number;
};

//ürün detay componenti kodları
const DetailBox = ({name, amount, discountedPrice, price}: DetailBoxProps) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* ürün fiyatı kodları ve stili */}
        <Text
          style={{
            color: '#4C3398',
            fontFamily: 'Poppins-Bold',
            fontSize: 14,
            textDecorationLine: 'line-through',
          }}>
          <Text>{'\u20BA'}</Text>
          {price}
        </Text>
        {/* indirimli ürün fiyatı kodları ve stili */}
        <Text
          style={{
            color: '#4C3398',
            fontFamily: 'Poppins-Bold',
            fontSize: 18,
            paddingLeft: 15,
          }}>
          <Text>{'\u20BA'}</Text>
          {discountedPrice}
        </Text>
      </View>
      {/* ürün adı kodları ve stili */}
      <Text
        style={{
          color: '#000000',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 14,
        }}>
        {name}
      </Text>
      {/* ürün miktarı kodları ve stili */}
      <Text
        style={{
          color: '#8C909A',
          marginBottom: 15,
          fontFamily: 'Poppins-SemiBold',
          fontSize: 11.5,
        }}>
        {amount}
      </Text>
    </View>
  );
};

export default DetailBox;

const styles = StyleSheet.create({});
