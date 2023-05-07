import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type DetailPropertyProps = {
  description: string;
  ingredients: string;
  nutritiveValue: string;
  usage: string;
  additionalInformation: string;
};

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
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',

          fontFamily: 'Poppins-Regular',
        }}>
        {description}
      </Text>
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
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',

          fontFamily: 'Poppins-Regular',
        }}>
        {ingredients}
      </Text>
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
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',

          fontFamily: 'Poppins-Regular',
        }}>
        {nutritiveValue}
      </Text>
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
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 12,
          color: 'black',

          fontFamily: 'Poppins-Regular',
        }}>
        {usage}
      </Text>
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
