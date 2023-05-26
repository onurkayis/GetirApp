import {Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import client from '../api/client';
const {height, width} = Dimensions.get('window');

//banner componenti
const Banner = () => {
  const [banners, setBanners] = useState([]);

  //banner'ları veritabanından çek
  const fetchData = async () => {
    const response = await client.get('/banners');
    //bannerları banners'a ata
    setBanners(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderBanner = ({item}) => {
    //banner'ların görünüş kodu ve stilini oluşturuyoruz
    return (
      <Image
        source={{uri: item.src}}
        style={{width: width, height: height * 0.24, resizeMode: 'stretch'}}
      />
    );
  };

  return (
    //flatlist ile banner list oluşturuyoruz
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
