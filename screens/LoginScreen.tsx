import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppLoader from '../components/AppLoader';
import LoginForm from '../components/LoginForm';
import {useLogin} from '../context/LoginProvider';

export default function LoginScreen() {
  //Apploader(animasyon) verisini tanımlıyoruz
  const {loginPending} = useLogin();

  //Login ekranı kodları
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.txtHosgeldiniz}>Hoşgeldiniz!</Text>

        {/* login form componenti */}
        <LoginForm />
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

//Login ekranı css kodları
const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  //hosgeldiniz yazısının stil kodları
  txtHosgeldiniz: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#660099',
    marginTop: 100,
    marginBottom: 90,
  },
});
