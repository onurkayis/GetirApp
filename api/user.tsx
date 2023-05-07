import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './client';
import {showMessage} from 'react-native-flash-message';

//giriş yapma fonksiyonu
export const signIn = async (epostaAdresi, sifre) => {
  try {
    //axios kütüphanesi ile backende bağlanıyoruz
    const signInRes = await client.post('/sign-in', {
      epostaAdresi,
      sifre,
    });
    //giriş başarılıysa tokeni tutuyoruz
    if (signInRes.data.success) {
      const token = signInRes.data.token;
      await AsyncStorage.setItem('token', token);
    }

    return signInRes;
  } catch (error) {
    console.log('error inside sign in method', error.message);
  }
};

export const signOut = async () => {
  try {
    //tokeni local store'da tutuyoruz
    const token = await AsyncStorage.getItem('token');
    //localdeki token null değilse backende bağlanıyoruz
    if (token !== null) {
      const res = await client.get('/sign-out', {
        headers: {
          Authorization: `${token}`,
        },
      });
      //tokeni localden siliyoruz
      if (res.data.success) {
        await AsyncStorage.removeItem('token');
        showMessage({
          message: res.data.message,
          type: 'success',
        });
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log('error inside sign out method', error.message);
    return false;
  }
};
