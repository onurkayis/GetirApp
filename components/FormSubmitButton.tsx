import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const FormSubmitButton = (props: any) => {
  const {title, onPress, submitting} = props;
  const backgroundColor = submitting
    ? 'rgba(76, 51, 152, 0.4)'
    : 'rgba(76, 51, 152, 1)';
  return (
    <View>
      <TouchableOpacity
        onPress={!submitting ? onPress : null}
        style={[styles.button, {backgroundColor}]}>
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 50,
    backgroundColor: '#4C3398',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
  },
  btnTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
