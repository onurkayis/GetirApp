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

const TypeBox = ({
  active,
  subCategory,
  setCat,
}: {
  active: string;
  subCategory: SubCategory;
  setCat: any;
}) => {
  const handlePress = () => {
    setCat(subCategory.id);
    console.log('tıklanan alt kategori:', subCategory.name);
  };

  return (
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

const TypeFiltering = ({subCategories = []}: Props) => {
  const [category, setCategory] = useState(
    subCategories.length > 0 ? subCategories[0].id : '',
  );

  useEffect(() => {
    // Set the first subcategory as active by default
    if (category === '' && subCategories.length > 0) {
      setCategory(subCategories[0].id);
    }
  }, [category, subCategories]);

  return (
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
