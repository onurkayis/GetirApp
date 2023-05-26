import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

//loading animasyonu componenti
const AppLoader = () => {
  return (
    //loading animasyonunu lottieview kütüphanesi ile oluşturduk
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView source={require('../assets/loading.json')} autoPlay loop />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});
