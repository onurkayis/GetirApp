import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import client from '../api/client';
import TypeFiltering from './TypeFiltering';
import {useRoute} from '@react-navigation/native';
import ProductsContainer from './ProductsContainer';
const {width, height} = Dimensions.get('window');

//category box fonksiyonu
const CategoryBox = ({
  item,
  activeName,
  activeDefault,
  setCat,
  setSubCategories,
}: {
  item: any;
  activeName: string;
  activeDefault: string;
  setCat: any;
  setSubCategories: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setCat(item.name);
        setSubCategories(item.subCategories);
        {
          console.log('tıklanan kategori', item.name);
        }
      }}
      style={[
        {
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        },
        item.name === activeDefault && {
          borderBottomWidth: 2.5,
          borderBottomColor: '#F7D102',
        },
        item.name === activeName && {
          borderBottomWidth: 2.5,
          borderBottomColor: '#F7D102',
        },
      ]}>
      <View>
        <Text
          style={{
            color: '#ffffff',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 12,
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

//ana kategori componenti
const CategoryFilterHeader = () => {
  const route = useRoute();
  const scrollViewRef = useRef<ScrollView>(null);

  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  //kategorileri veritabanıncan çekme
  const fetchData = async () => {
    const response = await client.get('/categories');
    //categories'e veritabanından gelen kategorileri atama
    setCategories(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //kategıriye tıklandığında aktif kategoriyi gösterir ve alt kategorilerini gösterir
  useEffect(() => {
    const selectedCategory = route.params?.selectedCategory ?? '';
    const subCategories = route.params?.subCategories ?? [];
    setActiveCat(selectedCategory);
    setSubCategories(subCategories);

    // ana sayfadaki kategorilerden hangisine basıldıysa
    // kategori detayda o kategori nerde ise oraya otomatik kaydırma işlemi yapılır
    const activeCategoryIndex = categories.findIndex(
      item => item.name === selectedCategory,
    );
    if (activeCategoryIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: activeCategoryIndex * width * 0.18,
        animated: true,
      });
    }
  }, [route.params, categories]);

  //kategoriye tıklandığında aktif kategoriyi gösterir
  const handleSetActiveCat = (catName: string) => {
    if (catName === activeCat) {
      setActiveCat('');
      setSubCategories([]);
    } else {
      setActiveCat(catName);
    }
  };

  return (
    <>
      {/* scroll view ile ekrana kaydırma özelliği veriyoruz */}
      <ScrollView
        ref={scrollViewRef}
        style={{
          width: width,
          height: height * 0.06,
          backgroundColor: '#7849F7',
        }}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        horizontal={true}>
        {/*  kategorileri map ederek listeliyoruz */}
        {categories.map(item => (
          <CategoryBox
            key={item._id}
            item={item}
            activeName={activeCat}
            setCat={handleSetActiveCat}
            setSubCategories={setSubCategories}
          />
        ))}
      </ScrollView>
      {/* alt kategori componenti */}
      <TypeFiltering subCategories={subCategories} />
      {/* ürün componenti */}
      <ProductsContainer activeCategory={activeCat} />
    </>
  );
};

export default CategoryFilterHeader;

const styles = StyleSheet.create({});
