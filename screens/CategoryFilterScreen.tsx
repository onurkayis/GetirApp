import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CategoryFilterHeader from '../components/CategoryFilterHeader';

//kategori detay sayfası kodları
const CategoryFilterScreen = () => {
  return (
    //ekrana kaydırma özelliği verme
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#f5f5f5'}}>
      {/* kategori detay sayfasındaki tüm componentlerin birleştirildiği component */}
      <CategoryFilterHeader />
    </ScrollView>
  );
};

export default CategoryFilterScreen;

const styles = StyleSheet.create({});
