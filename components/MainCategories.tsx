import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategoryItem from './CategoryItem';
import client from '../api/client';

const MainCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const response = await client.get('/categories');
    setCategories(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{backgroundColor: '#F5F5F5'}}>
      <View style={styles.listContainer}>
        {categories.map(item => (
          <CategoryItem key={item._id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default MainCategories;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 10,
  },
});
