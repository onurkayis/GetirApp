import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import HeaderMain from '../components/HeaderMain';
import Banner from '../components/Banner';
import MainCategories from '../components/MainCategories';

//Anasayfa ekran kodları
const HomeScreen = () => {
  return (
    // ekrana kaydırma özelliği verme
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      stickyHeaderIndices={[0]}>
      {/* adres componenti */}
      <HeaderMain />
      {/* banner componenti */}
      <Banner />
      {/* kategoriler componenti */}
      <MainCategories />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
});
