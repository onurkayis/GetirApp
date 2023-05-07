import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type DetailBoxProps = {
  name: string;
  price: number;
  amount: string;
  discountedPrice: number;
};

const DetailBox = ({name, amount, discountedPrice}: DetailBoxProps) => {
  return (
    <View
      style={{width: '100%', backgroundColor: 'white', alignItems: 'center'}}>
      <Text
        style={{
          color: '#4C3398',
          fontFamily: 'Poppins-Bold',
          fontSize: 18,
          marginTop: 10,
        }}>
        <Text>{'\u20BA'}</Text>
        {discountedPrice}
      </Text>
      <Text
        style={{
          color: '#000000',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 14,
        }}>
        {name}
      </Text>
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
