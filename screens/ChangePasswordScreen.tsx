import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FormSubmitButton from '../components/FormSubmitButton';
import FormInput from '../components/FormInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLogin} from '../context/LoginProvider';
import AppLoader from '../components/AppLoader';

//şifre için validasyon işlemi
const validationSchema = Yup.object({
  //şifre validasyonu
  sifre: Yup.string()
    .trim()
    .min(8, 'Şifre 8 karakterden az olamaz!')
    .required('Şifre alanı boş olamaz!'),
  //şifre tekrar validasyonu
  sifreTekrar: Yup.string()
    .required('Şifre tekrar alanı boş olamaz!')
    .equals([Yup.ref('sifre'), null], 'Şifreler aynı olmalıdır!'),
});

//şifre değiştirme ekranı kodları
const ChangePasswordScreen = () => {
  const navigation = useNavigation();

  const {loginPending, setLoginPending} = useLogin();

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);

  const userInfo = {
    sifre: '',
    sifreTekrar: '',
  };

  //şifre sıfırlama fonksiyonu
  const ChangePassword = async (values, formikActions) => {
    setLoginPending(true);
    setTimeout(async () => {
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setLoginPending(false);
      //şifre sıfırlandıktan sonra giriş sayfasına yönlendirme
      navigation.navigate('LoginScreen');
    }, 3000);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.txt}>Lütfen Yeni Şifrenizi Giriniz !</Text>
        {/* formik kütüphanesi ile şifre yenileme formu oluşturma */}
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={ChangePassword}>
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => {
            const {sifre, sifreTekrar} = values;
            return (
              <>
                {/* şifre inputu kodları ve özellikleri */}
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
                    // şifre göster, gizle kodları
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry(prev => !prev);
                      }}>
                      {isSecureEntry ? (
                        // şifre gizliyken gösterilen icon
                        <Ionicons name="eye-off" size={18} color="#660099" />
                      ) : (
                        // şifre açıkken gösterilen icon
                        <Ionicons name="eye" size={18} color="#660099" />
                      )}
                    </TouchableOpacity>
                  }
                />
                {/* şifre tekrar inputu kodları ve özellikleri */}
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
                    // şifre göster, gizle kodları
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry2(prev => !prev);
                      }}>
                      {isSecureEntry2 ? (
                        // şifre gizliyken gösterilen icon
                        <Ionicons name="eye-off" size={18} color="#660099" />
                      ) : (
                        // şifre açıkken gösterilen icon
                        <Ionicons name="eye" size={18} color="#660099" />
                      )}
                    </TouchableOpacity>
                  }
                />
                {/* Değiştir butonunun kodları ve özellikleri */}
                <FormSubmitButton
                  submitting={isSubmitting}
                  onPress={handleSubmit}
                  title={'Değiştir'}
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

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //yeni şifrenizi giriniz yazısının stil kodları
  txt: {
    fontFamily: 'Poppins-SemiBold',
    color: '#660099',
    fontSize: 18,
    top: -100,
  },
});
