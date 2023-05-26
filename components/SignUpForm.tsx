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
  // ad soyad validasyonu
  adSoyad: Yup.string()
    .matches(nameRegx, 'Ad soyad geçerli karakterleri içermiyor!')
    .trim()
    .min(3, 'Ad soyad 3 karakterden az olamaz!')
    .required('Ad soyad boş geçilemez!'),
  // e posta adresi validasyonu
  epostaAdresi: Yup.string()
    .matches(emailRegx, 'Geçersiz E-posta!')
    .required('E-posta boş geçilemez!'),
  // telefon numarası validasyonu
  telefonNumarası: Yup.string()
    .trim()
    .matches(
      phoneRegx,
      'Telefon numarası geçerli değil! (Telefon numarası 0 ile başlamalıdır)',
    )
    .min(11, 'Telefon numarası 11 hane olmalıdır!')
    .max(11, 'Telefon numarası 11 hane olmalıdır!')
    .required('Telefon numarası boş geçilemez!'),
  // şifre validasyonu
  sifre: Yup.string()
    .trim()
    .min(8, 'Şifre 8 karakterden az olamaz!')
    .required('Şifre boş geçilemez!'),
  // şifre tekrar validasyonu
  sifreTekrar: Yup.string()
    .required('Şifre tekrar boş geçilemez!')
    .equals([Yup.ref('sifre'), null], 'Şifreler aynı olmalıdır!'),
});

// sign up form componenti kodları
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
      {/* formik kütüphanesi ile form oluşturma */}
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
              {/* ad soyad input kodları ve özellikleri */}
              <FormInput
                value={adSoyad}
                error={touched.adSoyad && errors.adSoyad}
                onChangeText={handleChange('adSoyad')}
                onBlur={handleBlur('adSoyad')}
                placeholder={'Ad Soyad'}
                label={'Ad Soyad'}
              />
              {/* e posta adresi input kodları ve özellikleri */}
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
              {/* telefon numarası input kodları ve özellikleri */}
              <FormInput
                value={telefonNumarası}
                error={touched.telefonNumarası && errors.telefonNumarası}
                onChangeText={handleChange('telefonNumarası')}
                onBlur={handleBlur('telefonNumarası')}
                placeholder={'Cep Telefonu'}
                label={'Cep Teleonu'}
                keyboardType="phone-pad"
              />
              {/* şifre input kodları ve özellikleri */}
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
                  // şifreyi göster, gizle iconu kodu
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry(prev => !prev);
                    }}>
                    {isSecureEntry ? (
                      //şifre gizliyken gösterilen icon
                      <Ionicons name="eye-off" size={18} color="#4C3398" />
                    ) : (
                      //şifre açıkken gösterilen icon
                      <Ionicons name="eye" size={18} color="#4C3398" />
                    )}
                  </TouchableOpacity>
                }
              />
              {/* şifre tekrar input kodları ve özellikleri */}
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
                  // şifreyi göster, gizle iconu kodu
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry2(prev => !prev);
                    }}>
                    {isSecureEntry2 ? (
                      // şifre gizliyken gösterilen icon
                      <Ionicons name="eye-off" size={18} color="#4C3398" />
                    ) : (
                      // şifre açıkken gösterilen icon
                      <Ionicons name="eye" size={18} color="#4C3398" />
                    )}
                  </TouchableOpacity>
                }
              />
              {/* aydınlatma metni yazısının kodları */}
              <Text style={styles.txtAydınlatmaMetni}>
                Kişisel verilerinize dair Aydınlatma Metni için
                <Text
                  style={{color: '#4C3398', fontFamily: 'Poppins-SemiBold'}}>
                  {' '}
                  tıklayınız.
                </Text>
              </Text>
              {/* kullanım koşulu yazısının kodları */}
              <Text style={styles.txtKullanımKosulu}>
                Üye olmakla,
                <Text
                  style={{color: '#4C3398', fontFamily: 'Poppins-SemiBold'}}>
                  {' '}
                  Kullanım Koşulları{' '}
                </Text>
                hükümlerini kabul etmektesiniz.
              </Text>
              {/* Üye ol butonunun kodları */}
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title={'Üye Ol'}
              />
              {/* hesabınız var mı ? giriş yap yazısının kodları */}
              <Text style={styles.txtGiris}>
                Hesabınız var mı?
                <Text
                  style={{
                    color: '#4C3398',
                    fontFamily: 'Poppins-SemiBold',
                  }}
                  // giriş sayfasına yönlendirme
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
  //ana component stil kodları
  container: {
    alignItems: 'center',
    top: 5,
  },
  //giriş yap yazısının stil kodları
  txtGirisYap: {
    marginLeft: 5,
    color: '#4C3398',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  //giriş yazısının stil kodları
  txtGiris: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  //kullanım koşulu yazısının stil kodları
  txtKullanımKosulu: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginTop: 10,
    width: 350,
  },
  //aydınlatma metni yazısının stil kodları
  txtAydınlatmaMetni: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginTop: 10,
    width: 350,
  },
});
