import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const {width, height} = Dimensions.get('window');

interface SubCategory {
  id: string;
  name: string;
}

interface Props {
  subCategories: SubCategory[];
}

//type box component kodları
const TypeBox = ({
  active,
  subCategory,
  setCat,
  activeCategory,
}: {
  active: string;
  subCategory: SubCategory;
  setCat: any;
  activeCategory: string;
}) => {
  //alt kategoriye tıklandığında onu seçili yapan kod
  const handlePress = () => {
    setCat(subCategory.id);
    console.log('tıklanan alt kategori:', subCategory.name);
  };

  useEffect(() => {
    if (activeCategory !== subCategory.id) {
      setCat('');
    }
  }, [activeCategory, subCategory]);

  return (
    //alt kategori buton kodları
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          borderRadius: 6,
          height: height * 0.044,
          marginRight: 12,
        },
        subCategory.id === active
          ? {backgroundColor: '#5C3EBC'}
          : {borderColor: '#F0EFF7', borderWidth: 1},
      ]}>
      {/* alt kategori ismi yazısının kodu ve stil kodları */}
      <Text
        style={[
          {fontSize: 12, color: '#7849F7', fontWeight: '600'},
          subCategory.id === active && {color: 'white'},
        ]}>
        {subCategory.name}
      </Text>
    </TouchableOpacity>
  );
};

//type filtering componenti kodları
const TypeFiltering = ({subCategories = []}: Props) => {
  const [category, setCategory] = useState(
    subCategories.length > 0 ? subCategories[0].id : '',
  );

  useEffect(() => {
    // set the first subcategory as active by default
    if (category === '' && subCategories.length > 0) {
      setCategory(subCategories[0].id);
    }
  }, [category, subCategories]);

  return (
    // sayfaya kaydırma özelliği verme
    <ScrollView
      showsHorizontalScrollIndicator={false}
      bounces={true}
      horizontal={true}
      style={{
        width: width,
        height: height * 0.06,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical: height * 0.008,
        paddingHorizontal: 12,
      }}>
      {/* alt kategorileri map ile listeleme */}
      {subCategories.map(subCategory => (
        <TypeBox
          key={subCategory.id}
          setCat={setCategory}
          subCategory={subCategory}
          active={category}
        />
      ))}
    </ScrollView>
  );
};

export default TypeFiltering;

const styles = StyleSheet.create({});
