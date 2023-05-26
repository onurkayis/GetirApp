import {StyleSheet, TextInput, View, Text} from 'react-native';
import React from 'react';

//Form Input componenti kodları
const FormInput = (props: any) => {
  //form input componentinde kullanılan propslar
  const {placeholder, keyboardType, secureTextEntry, error, icon, label} =
    props;
  return (
    <View>
      <View style={styles.container}>
        {/* text input üzerindeki label'ın kodu */}
        <Text style={styles.label}>{label}</Text>
        {/* text input kodu ve özelliklerini tanımlama */}
        <View style={styles.inputAndIconContainer}>
          <TextInput
            style={styles.input}
            {...props}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
          {/* text inputta kullanılan icon kodu */}
          <View style={styles.icon}>{icon}</View>
        </View>
      </View>
      {/* ekranda gösterilen validation hatasının kodu ve stili */}
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
  //sayfanın genel stil kodları
  container: {
    marginTop: 7,
  },
  //text inputların stil kodları
  input: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    padding: 10,
    flex: 1,
  },
  //iconun stil kodları
  icon: {
    paddingRight: 5,
  },
  //input ve icon stil kodları
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
  //input üzerindeki label'ın stil kodları
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    color: '#4C3398',
  },
});
