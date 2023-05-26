import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductItem from './ProductItem';
import client from '../api/client';

// products container component kodları
const ProductsContainer = ({activeCategory}) => {
  const [products, setProducts] = useState([]);

  // ürünleri veritabanından çekme
  const fetchData = async () => {
    const response = await client.get('/products');
    // gelen ürünleri products'a atama
    setProducts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //ürünleri kategoriye göre listeleme
  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : products.filter(product => product.category === activeCategory);

  return (
    <View>
      {/* ürün view'i  */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          flexWrap: 'wrap',
          width: '100%',
          backgroundColor: 'white',
          paddingVertical: 15,
          marginBottom: 10,
          marginTop: 3,
        }}>
        {/* ürünleri kategoriye göre listeleme */}
        {filteredProducts.map(item => (
          <ProductItem key={item._id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ProductsContainer;
