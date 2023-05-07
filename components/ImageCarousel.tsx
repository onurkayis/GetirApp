import {FlatList, Image, StyleSheet, View, Dimensions} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');

const ImageCarousel = ({images}: {images: string[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
      <FlatList
        data={images}
        style={{width: width * 0.5, height: height * 0.25}}
        renderItem={item => (
          <Image
            source={{uri: item.item}}
            style={{width: width * 0.5, height: height * 0.25}}
            resizeMode="stretch"
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.5}
        snapToAlignment="center"
        decelerationRate={'fast'}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}></FlatList>
      <View style={styles.dots}>
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
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    marginVertical: 2,
    marginHorizontal: 5,
  },
});
