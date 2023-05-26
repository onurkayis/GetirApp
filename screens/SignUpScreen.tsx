import {StyleSheet, View} from 'react-native';
import React from 'react';
import SignUpForm from '../components/SignUpForm';
import AppLoader from '../components/AppLoader';
import {useLogin} from '../context/LoginProvider';

//sign up screem sayfası kodları
export default function SignUpScreen() {
  const {loginPending} = useLogin();

  return (
    <>
      {/* ana view  */}
      <View style={styles.container}>
        {/* SignUpForm componenti */}
        <SignUpForm />
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
