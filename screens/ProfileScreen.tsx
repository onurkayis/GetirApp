import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppLoader from '../components/AppLoader';
import {signOut} from '../api/user';
import {useLogin} from '../context/LoginProvider';
import Profile from '../components/Profile';
const {width, height} = Dimensions.get('window');
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {loginPending, setIsLoggedIn, setLoginPending} = useLogin();
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Profile />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteProductsScreen')}
            style={{
              marginTop: 10,
              width: width,
              height: height * 0.065,
              backgroundColor: 'white',
              paddingHorizontal: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#5C3EBC',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
              }}>
              Favori Ürünlerim
            </Text>
            <Octicons color={'#5C3EBC'} name="heart-fill" size={20} />
          </TouchableOpacity>
        </View>

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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
