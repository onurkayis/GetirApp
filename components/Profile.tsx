import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useLogin} from '../context/LoginProvider';
const {width, height} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const {profile} = useLogin();

  return (
    <>
      <View
        style={{
          width: width,
          backgroundColor: '#ffffff',
          marginTop: 15,
        }}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome color={'#4C3398'} name="user" size={65} />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              marginLeft: 20,
              fontSize: 15,
              color: '#6B7788',
            }}>
            {profile.adSoyad}
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              marginTop: -50,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                height: height * 0.07,
                width: width * 0.14,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: '#C1AEFC',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={25}
                  color={'#4C3398'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            padding: 10,
            borderTopColor: '#eeeeee',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Zocial name="email" size={25} color={'#4C3398'} />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              marginLeft: 20,
              fontSize: 14,
              color: '#6B7788',
            }}>
            {profile.epostaAdresi}
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            padding: 10,
            borderTopColor: '#eeeeee',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome
            style={{marginLeft: 5}}
            name="phone"
            size={25}
            color={'#4C3398'}
          />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              marginLeft: 20,
              fontSize: 14,
              color: '#6B7788',
            }}>
            {profile.telefonNumarası}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
