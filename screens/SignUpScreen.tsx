import {StyleSheet, View} from 'react-native';
import React from 'react';
import SignUpForm from '../components/SignUpForm';
import AppLoader from '../components/AppLoader';
import {useLogin} from '../context/LoginProvider';

export default function SignUpScreen() {
  const {loginPending} = useLogin();

  return (
    <>
      <View style={styles.container}>
        {/* SignUpForm componenti */}
        <SignUpForm />
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
