import {FlatList, Image, StyleSheet, View, Dimensions} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');

//ürün detaydaki image carousel componenti(ürün resminin kodları)
const ImageCarousel = ({images}: {images: string[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //ürün resmi birden fazla ise ürünün ilk resmini gösteriyoruz
  const onViewRef = React.useRef(viewableItems => {
    if (viewableItems.viewableItems.length > 0) {
      setActiveIndex(viewableItems.viewableItems[0].index || 0);
    }
    //console.log(viewableItems);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View
      style={{
        width: '100%',
        height: height * 0.27,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      {/* ürün resminin listelenme kodu ve stilleri */}
      <FlatList
        data={images}
        style={{width: width * 0.5, height: height * 0.25}}
        renderItem={item => (
          //ürün resminin kodu ve stili
          <Image
            source={{uri: item.item}}
            style={{width: width * 0.5, height: height * 0.25}}
            resizeMode="stretch"
          />
        )}
        //flatlist'in özellikleri
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.5}
        snapToAlignment="center"
        decelerationRate={'fast'}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}></FlatList>

      <View style={styles.dots}>
        {/* ürün resminin altındaki mor noktanın kodları ve stili */}
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {backgroundColor: index === activeIndex ? '#5D3EBD' : '#F2F0FD'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  //ürün resminin altındaki noktaların stil kodları
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
  },
  //ürün resminin altındaki noktaların stil kodları
  dot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    marginVertical: 2,
    marginHorizontal: 5,
  },
});
