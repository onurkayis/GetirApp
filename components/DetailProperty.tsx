import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

//ürün açıklamasındaki propslar
type DetailPropertyProps = {
  description: string;
  ingredients: string;
  nutritiveValue: string;
  usage: string;
  additionalInformation: string;
};

//ürün açıklamasında bulunan detail property kodları
const DetailProperty = ({
  description,
  ingredients,
  nutritiveValue,
  usage,
  additionalInformation,
}: DetailPropertyProps) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingVertical: 10,
        marginTop: -5,
        marginBottom: 20,
      }}>
      {/* ürün açıklaması kodu ve stili */}
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',
          fontFamily: 'Poppins-Regular',
        }}>
        {description}
      </Text>
      {/* içindekiler yazısının kodu ve stili */}
      <Text
        style={{
          fontSize: 13,
          marginHorizontal: 12,
          color: '#5C3EBC',
          marginTop: 5,
          fontFamily: 'Poppins-SemiBold',
        }}>
        İçindekiler
      </Text>
      {/* içindekiler kısmındaki açıklamanın kodu ve stili */}
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',
          fontFamily: 'Poppins-Regular',
        }}>
        {ingredients}
      </Text>
      {/* besin değerleri yazısının kodu ve stili */}
      <Text
        style={{
          fontSize: 13,
          marginHorizontal: 12,
          color: '#5C3EBC',
          marginTop: 5,
          fontFamily: 'Poppins-SemiBold',
        }}>
        Besin Değerleri
      </Text>
      {/* besin değerleri kısmındaki açıklamanın kodu ve stili */}
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',
          fontFamily: 'Poppins-Regular',
        }}>
        {nutritiveValue}
      </Text>
      {/* kullanım yazısının kodu ve stili */}
      <Text
        style={{
          fontSize: 13,
          marginHorizontal: 12,
          color: '#5C3EBC',
          marginTop: 5,
          fontFamily: 'Poppins-SemiBold',
        }}>
        Kullanım
      </Text>
      {/* kullanım kısmındaki açıklamanın kodu ve stili */}
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',
          fontFamily: 'Poppins-Regular',
        }}>
        {usage}
      </Text>
      {/* ek bilgiler yazısının kodu ve stili */}
      <Text
        style={{
          fontSize: 13,
          marginHorizontal: 12,
          color: '#5C3EBC',
          marginTop: 5,
          fontFamily: 'Poppins-SemiBold',
        }}>
        Ek Bilgiler
      </Text>
      {/* ek bilgiler kısmındaki açıklamanın kodu ve stili */}
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',
          fontFamily: 'Poppins-Regular',
        }}>
        {additionalInformation}
      </Text>
    </View>
  );
};

export default DetailProperty;

const styles = StyleSheet.create({});
