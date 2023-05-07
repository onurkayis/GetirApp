import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductItem from './ProductItem';
import client from '../api/client';

const ProductsContainer = ({activeCategory}) => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await client.get('/products');
    setProducts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : products.filter(product => product.category === activeCategory);

  return (
    <View>
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
        {filteredProducts.map(item => (
          <ProductItem key={item._id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ProductsContainer;
