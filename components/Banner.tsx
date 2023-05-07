import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import client from '../api/client';
const {height, width} = Dimensions.get('window');

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const fetchData = async () => {
    const response = await client.get('/banners');
    setBanners(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderBanner = ({item}) => {
    return (
      <Image
        source={{uri: item.src}}
        style={{width: width, height: height * 0.24, resizeMode: 'stretch'}}
      />
    );
  };

  return (
    <FlatList
      data={banners}
      renderItem={renderBanner}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      snapToAlignment={'center'}
      decelerationRate={'fast'}></FlatList>
  );
};

export default Banner;

const styles = StyleSheet.create({});
