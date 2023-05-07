import {StyleSheet, TextInput, View, Text} from 'react-native';
import React from 'react';

const FormInput = (props: any) => {
  const {placeholder, keyboardType, secureTextEntry, error, icon, label} =
    props;
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputAndIconContainer}>
          <TextInput
            style={styles.input}
            {...props}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
          <View style={styles.icon}>{icon}</View>
        </View>
      </View>
      {error ? (
        <Text
          style={{
            color: 'red',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 12,
            textAlign: 'center',
          }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
  },
  input: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    padding: 10,
    flex: 1,
  },
  icon: {
    paddingRight: 5,
  },
  inputAndIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#C1AEFC',
    borderRadius: 5,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    color: '#4C3398',
  },
});
