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

const UserAddressesScreen = () => {
  const {profile} = useLogin();

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
      <Text style={{flex: 1}}>{profile.address}</Text>
      <TouchableOpacity onPress={onDeleteAddress}>
        <Ionicons name="trash" size={22} color="#4C3398" />
      </TouchableOpacity>
    </View>
  );
};

export default UserAddressesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
