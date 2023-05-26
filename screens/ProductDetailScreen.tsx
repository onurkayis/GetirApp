import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageCarousel from '../components/ImageCarousel';
import {Product} from '../models';
import DetailBox from '../components/DetailBox';
import DetailProperty from '../components/DetailProperty';
import AddToCartButton from '../components/AddToCartButton';

//product detail screen sayfası kodları
const ProductDetailScreen = props => {
  const [product, setProduct] = useState<Product>();
  //ürünün bilgilerini aktarıyoruz
  useEffect(() => {
    setProduct(props.route.params.product);
  }, []);

  if (!product) {
    return <ActivityIndicator color={'#4C3398'} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* ürünün resminin gösterildiği kod */}
        <ImageCarousel images={product.images} />
        {/* ürünün bilgilerinin gösterildi kod */}
        <DetailBox
          price={product.price}
          name={product.name}
          amount={product.amount}
          discountedPrice={product.discountedPrice}
        />
        {/* detaylar yazısının kodu ve stil kodları */}
        <Text
          style={{
            marginHorizontal: 12,
            marginVertical: 16,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 13,
            color: '#8C909A',
          }}>
          Detaylar
        </Text>
        {/* ürün detayındaki açıklamalar */}
        <DetailProperty
          description={product.description}
          ingredients={product.ingredients}
          nutritiveValue={product.nutritiveValue}
          usage={product.usage}
          additionalInformation={product.additionalInformation}
        />
      </ScrollView>
      {/* sepete ekle componenti kodu */}
      <AddToCartButton item={product} />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
