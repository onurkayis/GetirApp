import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FormInput from './FormInput';
import {useNavigation} from '@react-navigation/native';
import FormSubmitButton from './FormSubmitButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import client from '../api/client';
import {showMessage} from 'react-native-flash-message';
import {useLogin} from '../context/LoginProvider';

//telefon validasyon regx
const phoneRegx =
  /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g;

//e-posta validasyon regx
const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//ad soyad validasyon regx
const nameRegx = /^[A-Za-z ]*$/;

const validationSchema = Yup.object({
  adSoyad: Yup.string()
    .matches(nameRegx, 'Ad soyad geçerli karakterleri içermiyor!')
    .trim()
    .min(3, 'Ad soyad 3 karakterden az olamaz!')
    .required('Ad soyad boş geçilemez!'),
  epostaAdresi: Yup.string()
    .matches(emailRegx, 'Geçersiz E-posta!')
    .required('E-posta boş geçilemez!'),
  telefonNumarası: Yup.string()
    .trim()
    .matches(
      phoneRegx,
      'Telefon numarası geçerli değil! (Telefon numarası 0 ile başlamalıdır)',
    )
    .min(11, 'Telefon numarası 11 hane olmalıdır!')
    .max(11, 'Telefon numarası 11 hane olmalıdır!')
    .required('Telefon numarası boş geçilemez!'),
  sifre: Yup.string()
    .trim()
    .min(8, 'Şifre 8 karakterden az olamaz!')
    .required('Şifre boş geçilemez!'),
  sifreTekrar: Yup.string()
    .required('Şifre tekrar boş geçilemez!')
    .equals([Yup.ref('sifre'), null], 'Şifreler aynı olmalıdır!'),
});

const SignUpForm = () => {
  const navigation = useNavigation();

  const {setLoginPending} = useLogin();

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);

  const userInfo = {
    adSoyad: '',
    epostaAdresi: '',
    telefonNumarası: '',
    sifre: '',
    sifreTekrar: '',
  };

  //üye olma fonksiyonu
  const signUp = async (values, formikActions) => {
    setLoginPending(true);
    setTimeout(async () => {
      //backende bağlanma
      const res = await client.post('/sign-up', {
        ...values,
      });

      console.log(res.data);
      //üye olma işlemi başarılıysa ekrana bildirim gönderme
      if (res.data.success) {
        showMessage({
          message: res.data.message,
          type: 'success',
        });
        //üye olma işleminden sonra login ekranına yönlendirme
        navigation.navigate('LoginScreen');
      }
      //üye olma başarısız ise ekrana bildirim gönderme
      else {
        showMessage({
          message: res.data.message,
          type: 'danger',
        });
      }

      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setLoginPending(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          const {adSoyad, epostaAdresi, telefonNumarası, sifre, sifreTekrar} =
            values;
          return (
            <>
              <FormInput
                value={adSoyad}
                error={touched.adSoyad && errors.adSoyad}
                onChangeText={handleChange('adSoyad')}
                onBlur={handleBlur('adSoyad')}
                placeholder={'Ad Soyad'}
                label={'Ad Soyad'}
              />
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
                value={telefonNumarası}
                error={touched.telefonNumarası && errors.telefonNumarası}
                onChangeText={handleChange('telefonNumarası')}
                onBlur={handleBlur('telefonNumarası')}
                placeholder={'Cep Telefonu'}
                label={'Cep Teleonu'}
                keyboardType="phone-pad"
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
              <FormInput
                value={sifreTekrar}
                error={touched.sifreTekrar && errors.sifreTekrar}
                onChangeText={handleChange('sifreTekrar')}
                onBlur={handleBlur('sifreTekrar')}
                placeholder={'Şifre Tekrar'}
                label={'Şifre Tekrar'}
                keyboardType="default"
                secureTextEntry={isSecureEntry2}
                autoCapitalize="none"
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry2(prev => !prev);
                    }}>
                    {isSecureEntry2 ? (
                      <Ionicons name="eye-off" size={18} color="#4C3398" />
                    ) : (
                      <Ionicons name="eye" size={18} color="#4C3398" />
                    )}
                  </TouchableOpacity>
                }
              />
              <Text style={styles.txtAydınlatmaMetni}>
                Kişisel verilerinize dair Aydınlatma Metni için
                <Text
                  style={{color: '#4C3398', fontFamily: 'Poppins-SemiBold'}}>
                  {' '}
                  tıklayınız.
                </Text>
              </Text>
              <Text style={styles.txtKullanımKosulu}>
                Üye olmakla,
                <Text
                  style={{color: '#4C3398', fontFamily: 'Poppins-SemiBold'}}>
                  {' '}
                  Kullanım Koşulları{' '}
                </Text>
                hükümlerini kabul etmektesiniz.
              </Text>
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title={'Üye Ol'}
              />
              <Text style={styles.txtGiris}>
                Hesabınız var mı?
                <Text
                  style={{
                    color: '#4C3398',
                    fontFamily: 'Poppins-SemiBold',
                  }}
                  onPress={() => {
                    navigation.navigate('LoginScreen');
                  }}>
                  {' '}
                  Giriş Yap
                </Text>
              </Text>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top: 5,
  },
  txtGirisYap: {
    marginLeft: 5,
    color: '#4C3398',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  txtGiris: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  txtKullanımKosulu: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginTop: 10,
    width: 350,
  },
  txtAydınlatmaMetni: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginTop: 10,
    width: 350,
  },
});
