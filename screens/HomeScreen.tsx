import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import HeaderMain from '../components/HeaderMain';
import Banner from '../components/Banner';
import MainCategories from '../components/MainCategories';

const HomeScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      stickyHeaderIndices={[0]}>
      <HeaderMain />
      <Banner />
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
