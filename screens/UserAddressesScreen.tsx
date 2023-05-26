import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useLogin} from '../context/LoginProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

//adreslerim sayfasının ekran kodları
const UserAddressesScreen = () => {
  const {profile} = useLogin();

  //adres silme fonksiyonu
  const onDeleteAddress = () => {};

  return (
    <View
      style={{
        width: width,
        backgroundColor: 'white',
        height: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
      }}>
      {/* kullanıcı adresininin kodları ve stil kodları */}
      <Text style={{flex: 1}}>{profile.address}</Text>
      {/* adresin sağındaki çöp kutusu icon kodları ve stil kodları */}
      <TouchableOpacity onPress={onDeleteAddress}>
        <Ionicons name="trash" size={22} color="#4C3398" />
      </TouchableOpacity>
    </View>
  );
};

export default UserAddressesScreen;

const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
