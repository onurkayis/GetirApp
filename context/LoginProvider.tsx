import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';
import client from '../api/client';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPending, setLoginPending] = useState(false);
  const [profile, setProfile] = useState({});

  //kullanıcı çıkış yapmadığı sürece hesaptan çıkmama fonksiyonu
  const fetchUser = async () => {
    setLoginPending(true);

    //tokeni local store'da tutuyoruz
    const token = await AsyncStorage.getItem('token');
    //localdeki token null değilse backende bağlanıp tokeni doğruluyoruz
    if (token !== null) {
      const res = await client.get('/user-isAuth', {
        headers: {
          Authorization: `${token}`,
        },
      });

      //telefondaki token ile veritabanındaki token eşleşiyorsa kullanıcı giriş yapılı halde kalıyor
      if (res.data.success) {
        setIsLoggedIn(true);
        setProfile(res.data.user);
        await AsyncStorage.setItem('profile', JSON.stringify(res.data.user));
      }
      //tokenler eşleşmiyorsa kullanıcının yeniden giriş yapması isteniyor
      else {
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('profile');
      }
      setLoginPending(false);
    } else {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('profile');
      setLoginPending(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loginPending,
        setLoginPending,
        profile,
        setProfile,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
