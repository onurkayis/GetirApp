import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FormSubmitButton from '../components/FormSubmitButton';
import {DarkTheme, useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useLogin} from '../context/LoginProvider';
import AppLoader from '../components/AppLoader';
import {showMessage} from 'react-native-flash-message';
import client from '../api/client';

const ForgotPasswordOTP = () => {
  const navigation = useNavigation();
  const {loginPending, setLoginPending} = useLogin();

  const resendOTP = () => {};

  const verifyResetPasswordOTP = () => {
    setLoginPending(true);
    setTimeout(async () => {
      // const res = await client.post('/verify-password-reset-otp', {});

      // console.log(res.data);
      // showMessage({
      //   message: 'Kod onaylandı!',
      //   type: 'success',
      // });
      setLoginPending(false);
      navigation.navigate('ChangePasswordScreen');
    }, 3000);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.codeText}>
          Lütfen e-postanıza gönderilen kodu aşağıya giriniz!
        </Text>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          style={{width: '60%', height: 150}}
          codeInputFieldStyle={{
            color: '#660099',
            fontFamily: 'Poppins-Bold',
            borderColor: '#C1AEFC',
            borderWidth: 2,
            borderRadius: 5,
          }}
          codeInputHighlightStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <FormSubmitButton onPress={verifyResetPasswordOTP} title={'Devam Et'} />
        <Text style={styles.tekrarGonder}>
          Kod gelmedi mi?
          <Text
            style={{color: '#660099', fontFamily: 'Poppins-SemiBold'}}
            onPress={resendOTP}>
            {' '}
            Tekrar Gönder
          </Text>
        </Text>
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

export default ForgotPasswordOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tekrarGonder: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    top: 50,
  },
  codeText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
});
