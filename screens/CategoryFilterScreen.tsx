import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CategoryFilterHeader from '../components/CategoryFilterHeader';

const CategoryFilterScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#f5f5f5'}}>
      <CategoryFilterHeader />
    </ScrollView>
  );
};

export default CategoryFilterScreen;

const styles = StyleSheet.create({});
