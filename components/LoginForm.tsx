import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FormInput from './FormInput';
import {useNavigation} from '@react-navigation/native';
import FormSubmitButton from './FormSubmitButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {useLogin} from '../context/LoginProvider';
import {signIn} from '../api/user';

//email validasyonu için regx
const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//validasyon işlemleri
const validationSchema = Yup.object({
  epostaAdresi: Yup.string()
    .matches(emailRegx, 'Geçersiz E-posta!')
    .required('E-posta alanı boş olamaz!'),
  sifre: Yup.string()
    .trim()
    .min(8, 'Şifre 8 karakterden az olamaz!')
    .required('Şifre alanı boş olamaz!'),
});

//Loginform fonksiyonu
const LoginForm = () => {
  const navigation = useNavigation();

  const {setIsLoggedIn, setLoginPending, setProfile} = useLogin();

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const userInfo = {
    epostaAdresi: '',
    sifre: '',
  };

  //giriş işlemi fonksiyonu
  const SignIn = async (values, formikActions) => {
    setLoginPending(true);
    setTimeout(async () => {
      const res = await signIn(values.epostaAdresi, values.sifre);

      console.log(res.data);
      //giriş başarılı ise bir ekranın üstünde bir bildirim mesajı çıkıyor
      if (res.data.success) {
        showMessage({
          message: res.data.message,
          type: 'success',
        });
        setIsLoggedIn(true);
        setProfile(res.data.user);
        console.log(res?.data.user);
      }
      //giriş hatalı ise bir ekranın üstünde bir bildirim mesajı çıkıyor
      else {
        showMessage({
          message: res.data.message,
          type: 'danger',
        });
      }

      //3 saniye boyunca loading animasyonu ekranda duruyor ve form resetleniyor
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setLoginPending(false);
    }, 3000);
  };

  //tasarım kodları
  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={SignIn}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          const {epostaAdresi, sifre} = values;
          return (
            <>
              <FormInput
                value={epostaAdresi}
                error={touched.epostaAdresi && errors.epostaAdresi}
                onChangeText={handleChange('epostaAdresi')}
                onBlur={handleBlur('epostaAdresi')}
                placeholder={'E-posta Adresi'}
                label={'E-posta Adresi'}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <FormInput
                value={sifre}
                error={touched.sifre && errors.sifre}
                onChangeText={handleChange('sifre')}
                onBlur={handleBlur('sifre')}
                placeholder={'Şifre'}
                label={'Şifre'}
                keyboardType="default"
                secureTextEntry={isSecureEntry}
                autoCapitalize="none"
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry(prev => !prev);
                    }}>
                    {isSecureEntry ? (
                      <Ionicons name="eye-off" size={18} color="#4C3398" />
                    ) : (
                      <Ionicons name="eye" size={18} color="#4C3398" />
                    )}
                  </TouchableOpacity>
                }
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title={'Giriş Yap'}
              />
              <Text style={styles.txtSifremiUnuttum}>
                Şifrenizi mi unuttunuz?
                <Text
                  style={{color: '#4C3398', fontFamily: 'Poppins-SemiBold'}}
                  //şifremi unuttum ekranına yönlendirme
                  onPress={() => {
                    navigation.navigate('ForgotPasswordScreen');
                  }}>
                  {' '}
                  Şifremi Unuttum
                </Text>
              </Text>
              <Text style={styles.txtUyeOl}>
                Hesabınız yok mu?
                <Text
                  style={{color: '#4C3398', fontFamily: 'Poppins-SemiBold'}}
                  //üye olma ekranına yönlendirme
                  onPress={() => {
                    navigation.navigate('SignUpScreen');
                  }}>
                  {' '}
                  Üye Ol
                </Text>
              </Text>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default LoginForm;

//css kodları
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  txtUyeOl: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#73777B',
    marginTop: 100,
  },
  txtSifremiUnuttum: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
});
