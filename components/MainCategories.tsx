import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategoryItem from './CategoryItem';
import client from '../api/client';

//Main categories component kodları
const MainCategories = () => {
  const [categories, setCategories] = useState([]);

  //veritabanından kategori çekme kodu
  const fetchData = async () => {
    const response = await client.get('/categories');
    //gelen kategorileri categories'e atama
    setCategories(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // kategorilerin bulunduğu arka plan view'i
    <View style={{backgroundColor: '#F5F5F5'}}>
      <View style={styles.listContainer}>
        {/* kategorileri map ile listeliyoruz */}
        {categories.map(item => (
          // category item componenti
          <CategoryItem key={item._id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default MainCategories;

const styles = StyleSheet.create({
  //kategorilerin listelendiği component stil kodları
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 10,
  },
});
