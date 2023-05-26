import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FormInput from '../components/FormInput';
import FormSubmitButton from '../components/FormSubmitButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '../context/LoginProvider';
import client from '../api/client';
import {showMessage} from 'react-native-flash-message';
import AppLoader from '../components/AppLoader';

//e-posta regx'i
const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//e-posta için validasyon işlemi
const validationSchema = Yup.object({
  //eposta adresi validasyonu
  epostaAdresi: Yup.string()
    .matches(emailRegx, 'Geçersiz E-posta!')
    .required('E-posta alanı boş olamaz!'),
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const userInfo = {
    epostaAdresi: '',
  };

  const {loginPending, setLoginPending} = useLogin();

  //şifre yenileme kodu gönderme fonksiyonu
  const ForgotPassword = async (values, formikActions) => {
    setLoginPending(true);
    setTimeout(async () => {
      const res = await client.post('/forgot-password', {
        ...values,
      });

      //ekrana bildirim mesajı gönderme
      console.log(res.data);
      showMessage({
        message: 'Şifre yenileme kodu e-postanıza gönderildi!',
        type: 'success',
      });

      //form resetleme
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setLoginPending(false);
      //kod girme ekranına yönlendirme
      navigation.navigate('ForgotPasswordOTP');
    }, 3000);
  };

  return (
    <>
      <View style={styles.container}>
        {/* formik kütüphanesi ile form oluşturma */}
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={ForgotPassword}>
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => {
            const {epostaAdresi} = values;
            return (
              <>
                {/* bağlantı yazısının kodu */}
                <Text style={styles.txtBaglanti}>
                  Şifre yenileme kodunu gönderebilmemiz için e-posta adresinize
                  ihtiyacımız var!
                </Text>
                {/* şifremi unuttum sayfasındaki eposta adresi inputunun kodları ve özellikleri */}
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
                {/* Gönder butonunun kodları ve özellikleri */}
                <FormSubmitButton
                  submitting={isSubmitting}
                  onPress={handleSubmit}
                  title={'Gönder'}
                />
              </>
            );
          }}
        </Formik>
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //bağlantı yazısının stil kodları
  txtBaglanti: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#000000',
    width: 350,
    bottom: 10,
  },
});
