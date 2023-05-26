import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

//profile buttons component kodları
const ProfileButtons = ({icon, title, screenName}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
      }}>
      {/* profildeki favori ürünlerim, siparişlerim, adreslerim kısmının kodları ve stil kodları */}
      <TouchableOpacity
        // navigasyon ile hangisine tıklandıysa o sayfada yönlendirme
        onPress={() => navigation.navigate(`${screenName}`)}
        style={{
          width: width,
          height: height * 0.065,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* title'ın kodu ve stil kodları */}
        <Text
          style={{
            color: '#5C3EBC',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 13,
            flex: 1,
            paddingHorizontal: 5,
          }}>
          {title}
          {/* icon kodu */}
        </Text>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileButtons;

const styles = StyleSheet.create({});
