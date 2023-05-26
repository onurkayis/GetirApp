import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppLoader from '../components/AppLoader';
import {signOut} from '../api/user';
import {useLogin} from '../context/LoginProvider';
import Profile from '../components/Profile';
import ProfileButtons from '../components/ProfileButtons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

//profil sayfası ekran kodları
const ProfileScreen = () => {
  const {loginPending, setIsLoggedIn, setLoginPending} = useLogin();

  return (
    <>
      <View style={styles.container}>
        {/* profil componenti */}
        <Profile />
        {/* profildeki favori ürünlerim butonu */}
        <ProfileButtons
          title={'Favori Ürünlerim'}
          screenName={'FavoriteProductsScreen'}
          icon={
            <Octicons
              style={{paddingHorizontal: 5}}
              color={'#5C3EBC'}
              name={'heart-fill'}
              size={20}
            />
          }
        />
        {/* profildeki siparişlerim butonu */}
        <ProfileButtons
          title={'Siparişlerim'}
          screenName={'OrdersScreen'}
          icon={
            <Octicons
              style={{paddingHorizontal: 5}}
              color={'#5C3EBC'}
              name={'package'}
              size={20}
            />
          }
        />
        {/* profildeki adreslerim butonu */}
        <ProfileButtons
          title={'Adreslerim'}
          screenName={'UserAddressesScreen'}
          icon={
            <Entypo
              style={{paddingHorizontal: 5}}
              color={'#5C3EBC'}
              name={'address'}
              size={20}
            />
          }
        />
        {/* profildeki çıkış yapma butonu kodları ve stil kodları*/}
        <View style={{alignItems: 'center', marginTop: 30}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4C3398',
              width: 200,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}
            //çıkış yapma fonksiyonu
            onPress={async () => {
              setLoginPending(true);
              setTimeout(async () => {
                const isLoggedOut = await signOut();
                if (isLoggedOut) {
                  setIsLoggedIn(false);
                }
                setLoginPending(false);
              }, 3000);
            }}>
            {/* çıkış yap yazısının kodları ve stil kodları */}
            <Text style={{fontFamily: 'Poppins-SemiBold', color: '#ffffff'}}>
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
