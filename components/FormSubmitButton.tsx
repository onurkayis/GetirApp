import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

//auth'taki form submit button componenti kodları
const FormSubmitButton = (props: any) => {
  //componentte kullanılan propslar
  const {title, onPress, submitting} = props;
  //butona tıklandığında buton rengi değişiyor
  const backgroundColor = submitting
    ? 'rgba(76, 51, 152, 0.4)'
    : 'rgba(76, 51, 152, 1)';
  return (
    <View>
      {/* Form onaylama butonunun kodu */}
      <TouchableOpacity
        onPress={!submitting ? onPress : null}
        style={[styles.button, {backgroundColor}]}>
        {/* butonun üzerindeki title kodu */}
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  //auth kısmında kullanılan butonun stil kodları
  button: {
    width: 350,
    height: 50,
    backgroundColor: '#4C3398',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
  },
  //butondaki title'ın stil kodları
  btnTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
