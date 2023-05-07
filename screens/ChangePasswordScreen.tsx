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
import {showMessage} from 'react-native-flash-message';
import client from '../api/client';

//şifre için validasyon işlemi
const validationSchema = Yup.object({
  sifre: Yup.string()
    .trim()
    .min(8, 'Şifre 8 karakterden az olamaz!')
    .required('Şifre alanı boş olamaz!'),
  sifreTekrar: Yup.string()
    .required('Şifre tekrar alanı boş olamaz!')
    .equals([Yup.ref('sifre'), null], 'Şifreler aynı olmalıdır!'),
});

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
      navigation.navigate('LoginScreen');
    }, 3000);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.txt}>Lütfen Yeni Şifrenizi Giriniz !</Text>
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
                        <Ionicons name="eye-off" size={18} color="#660099" />
                      ) : (
                        <Ionicons name="eye" size={18} color="#660099" />
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
                        <Ionicons name="eye-off" size={18} color="#660099" />
                      ) : (
                        <Ionicons name="eye" size={18} color="#660099" />
                      )}
                    </TouchableOpacity>
                  }
                />

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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: 'Poppins-SemiBold',
    color: '#660099',
    fontSize: 18,
    top: -100,
  },
});
