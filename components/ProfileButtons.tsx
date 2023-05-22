import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

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
      <TouchableOpacity
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
        <Text
          style={{
            color: '#5C3EBC',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 13,
            flex: 1,
            paddingHorizontal: 5,
          }}>
          {title}
        </Text>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileButtons;

const styles = StyleSheet.create({});
