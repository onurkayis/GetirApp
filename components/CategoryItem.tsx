import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

//category item component kodları
const CategoryItem = ({item}) => {
  const navigation = useNavigation();

  return (
    //ana sayfadaki kategorinin görünüş kodları ve stilleri
    <TouchableOpacity
      onPress={() => {
        //kategoriye tıklandığında kategori detay sayfasına git
        navigation.navigate('CategoryDetails', {
          selectedCategory: item.name,
          subCategories: item.subCategories,
        });
        console.log('Tıklanan kategori:', item.name);
      }}
      style={{
        width: width * 0.25,
        height: width * 0.24,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
      {/* kategori resim kodu ve stili */}
      <Image
        style={{width: width * 0.18, height: width * 0.18, borderRadius: 10}}
        source={{uri: item.src}}
      />
      {/* kategori adı kodu ve stili */}
      <Text style={{fontSize: 12, color: '#100F0F', fontWeight: '500'}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
